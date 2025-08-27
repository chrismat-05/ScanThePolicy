from fastapi import FastAPI, Request
from pydantic import BaseModel
from typing import List, Dict
from analyze import analyze_policy

app = FastAPI()

class SummarizeRequest(BaseModel):
    input_type: str
    content: str

class SummarizeResponse(BaseModel):
    risk_score: int
    summaries: Dict[str, List[str]]

@app.post("/api/summarize", response_model=SummarizeResponse)
async def summarize_policy(req: SummarizeRequest):
    result = await analyze_policy(req.input_type, req.content)
    return SummarizeResponse(**result)

@app.get("/api/health")
async def health():
    return {"status": "ok"}