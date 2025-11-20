# 🤖 AI Policy Helper - RAG System

A **local-first RAG (Retrieval-Augmented Generation) system** for answering company policy and product questions with citations. Built with FastAPI, Next.js, and vector databases.

## ✨ Features

- 🎯 **Semantic Search** - Real semantic embeddings for accurate context retrieval
- 📚 **Multi-Document Support** - Load and index markdown and text documents automatically
- 🔗 **Citations & Attribution** - Every answer includes sources with document titles
- 🏗️ **OpenAI Integration** - Uses OpenAI API for intelligent responses
- 🗄️ **Vector Database** - Qdrant for scalable semantic search
- 🚫 **Scope Filtering** - Automatically rejects out-of-scope questions (0.35 similarity threshold)
- 🎨 **Modern UI** - Built with Next.js, React 18, shadcn/ui, and Tailwind CSS
- 🐳 **Docker-Ready** - Multi-stage Docker builds for frontend and backend
- ✅ **Fully Tested** - Comprehensive test suite with pytest

---

## 🚀 Quick Start (Docker)

### Prerequisites

- **Docker & Docker Compose**
- **Git**

### Run the Project

```bash
# 1. Clone the repository
git clone <repo-url>
cd ai-policy-helper-starter-pack

# 2. Build Docker images (required first time)
docker-compose build

# 3. Start all services
docker-compose up -d

# 4. Verify services are running
docker ps

# Access the application:
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
# API Docs: http://localhost:8000/docs
# Qdrant Admin: http://localhost:6333/dashboard
```

---

## 📝 What I Changed

This section documents customizations made to the starter pack:

### 1. **Docker Configuration**

- Updated Dockerfile paths for backend and frontend to work correctly with the project structure
- Fixed path resolution issues that were preventing Docker from finding files on the local machine

### 2. **LLM Configuration**

- Changed to use **OpenAI API** as the default LLM provider
- Set environment variable: `LLM_PROVIDER=openai`
- Configure your `OPENAI_API_KEY` in `.env` file

### 3. **Scope Filtering**

- Added **relevance threshold filtering** at **0.35 similarity score**
- If retrieved chunks score below 0.35, the system responds: _"That topic is outside my current scope"_
- This prevents the AI from answering questions unrelated to the policy documents in the `data/` folder
- Improves response accuracy and prevents out-of-scope hallucinations

### 4. **Frontend Improvements**

- Integrated **shadcn/ui** component library for modern UI components
- Enhanced styling with **Tailwind CSS** for better user experience
- Improved overall UI/UX with pre-built, customizable components
- Better responsive design for mobile and desktop

---

## 🔧 Configuration

Create a `.env` file in the project root:

```bash
# Required
OPENAI_API_KEY=sk-...

# Optional (defaults shown)
EMBEDDING_MODEL=local-384
LLM_PROVIDER=openai
VECTOR_STORE=qdrant
CHUNK_SIZE=700
CHUNK_OVERLAP=80
```

---

## 📁 Project Structure

```
├── backend/              # FastAPI Backend
│   ├── app/
│   │   ├── main.py      # API routes
│   │   ├── rag.py       # RAG engine
│   │   ├── ingest.py    # Document ingestion
│   │   └── tests/
│   └── requirements.txt
│
├── frontend/            # Next.js Frontend
│   ├── app/
│   ├── components/      # React components (shadcn/ui)
│   └── package.json
│
├── data/                # Policy documents (Markdown)
├── docker-compose.yml
└── README.md
```

---

## 🔧 API Endpoints

- **GET /api/health** - Health check
- **GET /api/metrics** - System metrics
- **POST /api/ingest** - Ingest documents from `data/` folder
- **POST /api/ask** - Ask a question and get AI response with citations

**Full API documentation**: `http://localhost:8000/docs`

---

## 🧪 Testing

```bash
# Run tests with Docker
docker-compose up -d
docker exec ai-policy-helper-starter-pack-backend-1 \
  sh -c "cd /app && PYTHONPATH=/app pytest app/tests/test_api.py -v"
```

---

## 🏗️ System Architecture

```
Frontend (Next.js + shadcn/ui + Tailwind)
    ↓ HTTP/REST API
Backend (FastAPI)
    ↓
RAG Pipeline
    ├─ Query Embedding (sentence-transformers)
    ├─ Semantic Search (Qdrant)
    ├─ Relevance Filter (score > 0.35)
    ├─ LLM Generation (OpenAI)
    └─ Citation Extraction
    ↓
Qdrant Database + OpenAI API
```

### Key Technologies

- **Frontend**: Next.js 14 + React 18 + shadcn/ui + Tailwind CSS
- **Backend**: FastAPI + Python 3.11
- **Embeddings**: sentence-transformers (384-dim, local)
- **Vector Store**: Qdrant
- **LLM**: OpenAI API
- **Scope Filter**: 0.35 similarity threshold

---

## 📚 Adding Your Documents

1. Add markdown (`.md`) or text (`.txt`) files to the `data/` directory
2. Use clear section headings for better organization:

   ```markdown
   # Section Title

   Content here...
   ```

3. Call `/api/ingest` via the Admin Panel or API to index the documents
4. Ask questions about the content

**Example:**

```
data/
├── Company_Policies.md
├── Product_Manual.md
└── FAQ.md
```

---

## 🐛 Troubleshooting

### Qdrant Connection Issues

**Error**: `Failed to connect to http://qdrant:6333`

**Solution**:

- Qdrant service may not be ready yet
- Check `docker ps` to confirm all containers are running
- Wait 3-5 seconds after `docker-compose up`
- Check logs: `docker logs <container-id>`

### Out-of-Scope Responses

**Query returns**: `"That topic is outside my current scope..."`

**Why**: Similarity score below 0.35 threshold

**Fix**:

- Add more relevant documents to `data/`
- Rephrase your question
- Check ingestion status: `GET /api/metrics`

---

## 📈 Future Enhancements

### Phase 1: Text-to-Speech & Audio Integration (Upcoming)

**What We'll Build:**

- 🔊 **Text-to-Speech (TTS)**: Convert answers to natural-sounding audio
- 🎙️ **Voice Input**: Accept spoken queries (Speech-to-Text)
- 🎧 **Audio UI**: Play/pause/download response audio
- 📱 **Mobile Voice**: Native voice control on mobile

**Implementation Details:**

```
User Flow:
1. User speaks query → Speech-to-Text (Whisper API)
2. Process query → RAG pipeline
3. Generate answer → Text-to-Speech (ElevenLabs / Google TTS)
4. Stream audio → User hears response
```

**Tech Stack:**

- **Speech-to-Text**: OpenAI Whisper
- **Text-to-Speech**: ElevenLabs (natural) or Google TTS
- **Audio Format**: MP3/WAV with streaming

**Benefits:**

- 📞 Better accessibility (blind users)
- 🚗 Hands-free operation (vehicles, calls)
- 🌍 Natural interaction
- 📈 Engagement increase

---

### Phase 2: Multi-Agent System & Interaction

**What We'll Build:**

- 🤖 **AI Agent Network**: Multiple specialized agents that collaborate
- 💬 **Agent-to-Agent Communication**: Agents can call each other
- 🎯 **Task Delegation**: Agents route requests to specialists
- 📊 **Conversation History**: Track agent interactions

**Example Interaction Flow:**

```
User: "My order hasn't arrived and I want a refund"

Step 1: Orchestrator receives query
Step 2: Orders & Shipping Agent
  - Retrieves order status
  - Realizes delivery delayed
  - Delegates to Returns Agent

Step 3: Returns & Refunds Agent
  - Checks refund eligibility
  - Applies policy rules
  - Requests authorization from Policy Agent

Step 4: Policy Agent
  - Confirms company policy
  - Returns approval + conditions

Step 5: Final Response Generated
  - Answer synthesized from all agents
  - Complete action plan provided
  - All sources cited
```

---

### Phase 3: Continuous Improvements

**Short-term (1-2 weeks):**

- [ ] Add real-time search (Google/Bing integration)
- [ ] Implement conversation memory
- [ ] Add user feedback mechanism
- [ ] Performance benchmarking

**Medium-term (1-2 months):**

- [ ] Multi-language support
- [ ] Document versioning
- [ ] A/B testing framework
- [ ] Analytics dashboard

**Long-term (Ongoing):**

- [ ] Fine-tuned embeddings model
- [ ] Custom LLM training on company data
- [ ] Mobile app (React Native)
- [ ] Browser extension
- [ ] Slack/Teams integration

---

## 🔒 Security Considerations

- ⚠️ **API is open** - Consider adding authentication for production
- 🔐 **API Keys** - Never commit `.env` files with real keys
- 📡 **CORS** - Currently allows all origins (modify for production)
- 🔒 **Rate Limiting** - Consider adding rate limiting middleware

---

## 📚 Documentation

- **API Documentation**: `http://localhost:8000/docs` (Swagger UI)
- **ReDoc**: `http://localhost:8000/redoc`

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

[Add your license here - e.g., MIT, Apache 2.0]

## 👨‍💻 Author

[Add your name/organization]

---

**Made with ❤️ for semantic search and RAG systems**
