from fastapi import FastAPI, Request
from pydantic import BaseModel
from typing import List, Dict

app = FastAPI()

class SummarizeRequest(BaseModel):
    input_type: str  # "text" or "url"
    content: str

class SummarizeResponse(BaseModel):
    risk_score: int
    summaries: Dict[str, List[str]]

@app.post("/summarize", response_model=SummarizeResponse)
async def summarize_policy(req: SummarizeRequest):
    # TODO: Add NLP, scoring, and summarization logic here
    # For now, return dummy data
    return SummarizeResponse(
        risk_score=7,
        summaries={
            "data_collected": ["Your name", "Email address"],
            "data_sharing": ["Shared with advertisers", "Stored indefinitely"],
            "user_rights": ["Right to request deletion", "Right to access data"]
        }
    )