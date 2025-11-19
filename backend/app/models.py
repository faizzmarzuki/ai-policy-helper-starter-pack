from pydantic import BaseModel, Field, field_validator
from typing import List, Optional, Dict, Any

class IngestResponse(BaseModel):
    indexed_docs: int = Field(description="Number of unique documents indexed")
    indexed_chunks: int = Field(description="Number of chunks indexed")

class AskRequest(BaseModel):
    query: str = Field(..., min_length=1, max_length=1000, description="The question to ask")
    k: int | None = Field(default=4, ge=1, le=20, description="Number of chunks to retrieve (1-20)")
    
    @field_validator('query')
    @classmethod
    def validate_query(cls, v: str) -> str:
        if not v or not v.strip():
            raise ValueError("Query cannot be empty")
        return v.strip()

class Citation(BaseModel):
    title: str
    section: str | None = None

class Chunk(BaseModel):
    title: str
    section: str | None = None
    text: str

class AskResponse(BaseModel):
    query: str
    answer: str
    citations: List[Citation]
    chunks: List[Chunk]
    metrics: Dict[str, Any]

class MetricsResponse(BaseModel):
    total_docs: int
    total_chunks: int
    avg_retrieval_latency_ms: float
    avg_generation_latency_ms: float
    embedding_model: str
    llm_model: str
