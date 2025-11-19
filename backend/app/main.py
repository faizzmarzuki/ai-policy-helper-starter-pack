from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from typing import List
import logging
from .models import IngestResponse, AskRequest, AskResponse, MetricsResponse, Citation, Chunk
from .settings import settings
from .ingest import load_documents
from .rag import RAGEngine, build_chunks_from_docs

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="AI Policy & Product Helper",
    description="A local-first RAG system for answering policy and product questions with citations",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

engine = RAGEngine()

@app.get("/")
def root():
    """Root endpoint with API information"""
    return {
        "name": "AI Policy & Product Helper API",
        "version": "1.0.0",
        "endpoints": {
            "health": "/api/health",
            "metrics": "/api/metrics",
            "ingest": "/api/ingest",
            "ask": "/api/ask",
            "docs": "/docs"
        }
    }

@app.get("/api/health")
def health():
    """Health check endpoint"""
    return {"status": "ok"}

@app.get("/api/metrics", response_model=MetricsResponse)
def metrics():
    """Get system metrics including document counts and latency statistics"""
    try:
        s = engine.stats()
        return MetricsResponse(**s)
    except Exception as e:
        logger.error(f"Error fetching metrics: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to fetch metrics: {str(e)}")

@app.post("/api/ingest", response_model=IngestResponse)
def ingest():
    """
    Ingest documents from the data directory.
    Loads all markdown and text files, chunks them, and indexes them in the vector store.
    """
    try:
        logger.info(f"Ingesting documents from {settings.data_dir}")
        docs = load_documents(settings.data_dir)
        if not docs:
            logger.warning(f"No documents found in {settings.data_dir}")
            return IngestResponse(indexed_docs=0, indexed_chunks=0)
        
        chunks = build_chunks_from_docs(docs, settings.chunk_size, settings.chunk_overlap)
        # Clear old vectors first to ensure we're using the current embedding model
        new_docs, new_chunks = engine.ingest_chunks(chunks, clear_first=True)
        logger.info(f"Ingested {new_docs} documents and {new_chunks} chunks")
        return IngestResponse(indexed_docs=new_docs, indexed_chunks=new_chunks)
    except FileNotFoundError as e:
        logger.error(f"Data directory not found: {e}")
        raise HTTPException(status_code=404, detail=f"Data directory not found: {settings.data_dir}")
    except Exception as e:
        logger.error(f"Error during ingestion: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to ingest documents: {str(e)}")

@app.post("/api/ask", response_model=AskResponse)
def ask(req: AskRequest):
    """
    Ask a question and get an answer with citations.
    
    - **query**: The question to ask (required)
    - **k**: Number of chunks to retrieve (default: 4)
    
    Returns an answer with citations and supporting chunks.
    """
    try:
        # Validate query
        if not req.query or not req.query.strip():
            raise HTTPException(status_code=400, detail="Query cannot be empty")
        
        # Validate k parameter
        k = req.k or 4
        if k < 1 or k > 20:
            raise HTTPException(status_code=400, detail="k must be between 1 and 20")
        
        logger.info(f"Processing query: {req.query[:100]}...")
        
        # Check if documents have been ingested
        stats = engine.stats()
        if stats["total_chunks"] == 0:
            logger.warning("No documents ingested yet")
            return AskResponse(
                query=req.query,
                answer="No documents have been ingested yet. Please go to the Admin panel and click 'Ingest sample docs' first, then try your question again.",
                citations=[],
                chunks=[],
                metrics={
                    "retrieval_ms": 0.0,
                    "generation_ms": 0.0,
                }
            )
        
        # Retrieve relevant chunks
        ctx = engine.retrieve(req.query, k=k)
        
        if not ctx:
            logger.warning(f"No context retrieved for query (out of scope). Total chunks in store: {stats['total_chunks']}")
            return AskResponse(
                query=req.query,
                answer="That topic is outside my current scope. I can help with product details, shipping, returns, and warranty questions. Could you try again with one of the above topics?",
                citations=[],
                chunks=[],
                metrics={
                    "retrieval_ms": stats.get("avg_retrieval_latency_ms", 0.0),
                    "generation_ms": 0.0,
                }
            )
        
        # Generate answer
        answer = engine.generate(req.query, ctx)
        
        # Build citations and chunks
        citations = [
            Citation(title=c.get("title", "Unknown"), section=c.get("section"))
            for c in ctx
        ]
        chunks = [
            Chunk(
                title=c.get("title", "Unknown"),
                section=c.get("section"),
                text=c.get("text", "")
            )
            for c in ctx
        ]
        
        stats = engine.stats()
        return AskResponse(
            query=req.query,
            answer=answer,
            citations=citations,
            chunks=chunks,
            metrics={
                "retrieval_ms": stats["avg_retrieval_latency_ms"],
                "generation_ms": stats["avg_generation_latency_ms"],
            }
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error processing query: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to process query: {str(e)}")
