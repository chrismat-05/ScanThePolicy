ScanIt
1. Goal: Help users instantly understand long, jargon-filled privacy policies & terms by summarizing them into three categories + a privacy risk score.
Why Unique: Instead of being a generic summarizer, it’s domain-focused → only extracts what matters for privacy.

2. Objectives
Provide a fast, clean, lightweight tool to summarize legal documents.
Deploy in a mono-repo setup (frontend + backend in /apps).
Backend: Python (NLP, summarization, scoring).
Frontend: Next.js (beautiful ReqAPI-style design).
Deployment: Vercel for both backend + frontend.

3. Target Users
General internet users → don’t want to read lengthy privacy policies.
Job seekers / SaaS users → quickly check company practices.
Students/professionals → improve awareness of data rights.
Developers → need to vet APIs, tools, or SaaS privacy terms.

4. Features
Input Methods
Paste policy text into textarea.
Enter URL → backend fetches + extracts visible text.

Summarization Categories
🔒 Data Collected (what data the policy takes).
🔗 Data Sharing (how/with whom it’s shared).
⚖️ User Rights (delete data, request access, etc.).

Privacy Risk Score
Scale 0–10 (color-coded badge).
Based on keyword heuristics (e.g., “sell”, “third party”, “indefinitely retained”).

Output Presentation
Summarized points inside cards (3 sections).
Risk score displayed prominently at top.
Copy summary button.

Ask questions to policy (LLM Q&A).

5. Tech Stack
Backend (Python)
Framework: FastAPI (async, fast, works with Vercel serverless).
NLP/Processing:
spaCy → named entity recognition, sentence splitting.
sumy / gensim → text summarization.
Custom keyword-based scoring.
PDF Parsing (optional): PyPDF2.
Requests: httpx / requests to fetch page text.

Frontend (Next.js + TailwindCSS)
Framework: Next.js 14 (app router).
Styling: Tailwind CSS.
UI Elements: Shadcn UI (for cards, inputs, badges).
Icons: Lucide React (for 🔒, 🔗, ⚖️).
Animations: Framer Motion (fade in summaries, score).

Deployment
Mono-repo →
apps/
  frontend/   # Next.js + Tailwind app
  backend/    # FastAPI app
vercel.json   # Route configs
README.md
Deploy via Vercel (backend as API routes).


6. User Flow
User lands on homepage.
Sees center input box (paste text or URL).
Clicks “Summarize Policy”.
Custom Loader animation while backend processes which is created with a custom animation of the formation of the logo.
Results shown:
Risk Score (badge with color).
Three category cards with bullet points.
Option: “Summarize another policy”.

7. Design Guidelines
Homepage Layout (ReqAPI style clone)

Navbar:
Left: App name/logo
Right: Links (About | GitHub).

Hero Section:
Big centered heading: “Understand Privacy Policies in Seconds”.
Subtext: Paste any privacy policy or link, and get a clear summary instantly.
Input box (glassy style, same as ReqAPI).
Button: Summarize Policy.

Result Section:
Appears after submission.
Card layout (3 cards in a grid):
🔒 Data Collected
🔗 Data Sharing
⚖️ User Rights

Risk Score badge at top with color:
0–3 (Green, Safe)
4–6 (Yellow, Medium)
7–10 (Red, Risky)

Footer:
Small text: “Built by Chris (CMA) — Open Source Project”.

8. Component Breakdown (Frontend)
Navbar.jsx → simple nav with brand + links.
Hero.jsx → input form, CTA button.
Loader.jsx → animated spinner while API works.
ResultCard.jsx → card with category title + summary list.
RiskBadge.jsx → colored badge with score.
Footer.jsx → credits.

9. API Design (Backend)
Endpoint: POST /summarize
Request:
{
  "input_type": "text" | "url",
  "content": "raw text or URL"
}

Response:
{
  "risk_score": 7,
  "summaries": {
    "data_collected": ["Your name", "Email address"],
    "data_sharing": ["Shared with advertisers", "Stored indefinitely"],
    "user_rights": ["Right to request deletion", "Right to access data"]
  }
}

10. Success Criteria
Works under 3–5s for ~3–5 page text.
Risk score feels logical.
UI is modern & responsive.
Deployment on Vercel is smooth (single repo).