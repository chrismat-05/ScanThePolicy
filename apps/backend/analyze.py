import spacy
from sumy.summarizers.lsa import LsaSummarizer
from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from typing import Dict, List
import re

nlp = spacy.load("en_core_web_sm")

RISK_KEYWORDS = [
    "sell", "third party", "indefinitely", "share", "advertiser", "retained", "data broker", "tracking", "analytics", "opt-out"
]

CATEGORY_KEYWORDS = {
    "data_collected": ["collect", "gather", "obtain", "information", "data", "personal", "identifier", "email", "name", "address", "location", "device", "ip", "cookie"],
    "data_sharing": ["share", "third party", "disclose", "provide", "sell", "transfer", "advertiser", "partner", "affiliate", "service provider"],
    "user_rights": ["right", "access", "delete", "opt-out", "request", "correct", "portability", "withdraw", "remove", "update"]
}

def extract_category_points(text: str, keywords: List[str]) -> List[str]:
    points = []
    doc = nlp(text)
    for sent in doc.sents:
        if any(kw in sent.text.lower() for kw in keywords):
            points.append(sent.text.strip())
    return points[:10]

def summarize_text(text: str) -> List[str]:
    parser = PlaintextParser.from_string(text, Tokenizer("english"))
    summarizer = LsaSummarizer()
    summary = summarizer(parser.document, 5)
    return [str(sentence) for sentence in summary]

def score_privacy_risk(text: str) -> int:
    score = 0
    text_lower = text.lower()
    for kw in RISK_KEYWORDS:
        if kw in text_lower:
            score += 1
    return min(10, score)

async def analyze_policy(input_type: str, content: str) -> Dict:
    text = content
    data_collected = extract_category_points(text, CATEGORY_KEYWORDS["data_collected"])
    data_sharing = extract_category_points(text, CATEGORY_KEYWORDS["data_sharing"])
    user_rights = extract_category_points(text, CATEGORY_KEYWORDS["user_rights"])
    if not data_collected:
        data_collected = summarize_text(text)
    if not data_sharing:
        data_sharing = summarize_text(text)
    if not user_rights:
        user_rights = summarize_text(text)
    risk_score = score_privacy_risk(text)
    return {
        "risk_score": risk_score,
        "summaries": {
            "data_collected": data_collected,
            "data_sharing": data_sharing,
            "user_rights": user_rights
        }
    }
