
from fastapi import FastAPI, Request, HTTPException
from pydantic import BaseModel
from typing import List, Dict
from analyze import analyze_policy
import httpx


app = FastAPI()

class SummarizeRequest(BaseModel):
    input_type: str
    content: str

class SummarizeResponse(BaseModel):
    risk_score: int
    summaries: Dict[str, List[str]]

@app.post("/api/summarize", response_model=SummarizeResponse)
async def summarize_policy(req: SummarizeRequest):
    if req.input_type == 'url':
        try:
            async with httpx.AsyncClient(timeout=10.0) as client:
                resp = await client.get(req.content)
                resp.raise_for_status()
                import re
                from bs4 import BeautifulSoup
                soup = BeautifulSoup(resp.text, 'html.parser')
                for tag in soup(['script', 'style']):
                    tag.decompose()
                text = soup.get_text(separator='\n')
                text = re.sub(r'\s+', ' ', text)
        except Exception as e:
            raise HTTPException(status_code=400, detail=f"Failed to fetch or parse URL: {e}")
        result = await analyze_policy('text', text)
        return SummarizeResponse(**result)
    else:
        result = await analyze_policy(req.input_type, req.content)
        return SummarizeResponse(**result)

@app.get("/api/health")
async def health():
    return {"status": "ok"}