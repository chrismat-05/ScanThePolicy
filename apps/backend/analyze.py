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
        s = sent.text.strip()
        # Filter: skip headers, boilerplate, generic, long, or contact/update lines
        if (
            any(kw in s.lower() for kw in keywords)
            and len(s.split()) <= 20
            and not re.match(r'^(privacy policy|effective date|contact|updates? to this policy|major changes|platform evolves|questions|concerns|formbuilderjs|tabulator|sheetjs|jspdf|resend mail|google sign-in|firebase|firestore|functions|data processing|data export|local|browser|server|email us|use our contact us form)', s.lower())
        ):
            points.append(s)
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
    def get_highlights(category):
        points = extract_category_points(text, CATEGORY_KEYWORDS[category])
        if points:
            return points
        summary = summarize_text(text)
        highlights = []
        for s in summary:
            for sent in re.split(r'(?<=[.!?])\s+', s):
                sent = sent.strip()
                if (
                    sent
                    and len(sent.split()) <= 20
                    and not re.match(r'^(privacy policy|effective date|contact|updates? to this policy|major changes|platform evolves|questions|concerns|formbuilderjs|tabulator|sheetjs|jspdf|resend mail|google sign-in|firebase|firestore|functions|data processing|data export|local|browser|server|email us|use our contact us form)', sent.lower())
                ):
                    highlights.append(sent)
        return highlights[:10]

    data_collected = get_highlights("data_collected")
    data_sharing = get_highlights("data_sharing")
    user_rights = get_highlights("user_rights")
    risk_score = score_privacy_risk(text)
    return {
        "risk_score": risk_score,
        "summaries": {
            "data_collected": data_collected,
            "data_sharing": data_sharing,
            "user_rights": user_rights
        }
    }
