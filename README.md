# Agentic CRM Router

An intelligent, full-stack lead qualification and automated routing engine. The system captures inbound prospect inquiries, scores them in real-time using rule-based intent analysis, and automates downstream CRM operations using workflow pipelines. Created and maintained by Muhammad Mudassar under Elevon Core.

## Architecture & Tech Stack
*   **Frontend Interface:** Responsive intake form built with Next.js and Tailwind CSS.
*   **Backend Engine:** Real-time Python and FastAPI scoring API evaluating firmographics and urgency.
*   **Workflow Orchestration:** n8n pipelines capturing webhooks to dynamically route validated data.
*   **External Integrations:** Google Sheets API for CRM logging and Gmail SMTP for priority notifications.

## Dynamic Lead Scoring
*   **Firmographics:** Awards points for valid corporate email domains (+10), target industries like SaaS or Finance (+10), and company scale (up to +40).
*   **Intent & Urgency:** Awards heavy point multipliers (+30) for explicit priority requests or context keywords like "automation" and "ai".
*   **Hot Leads (60+ Points):** Triggers immediate Google Sheet logging and dispatches priority email alerts to sales teams.
*   **Warm & Cold Leads (<60 Points):** Logs directly to the CRM database without triggering disruptive push notifications.

## Developer Setup
*   **Backend Server:** Navigate to the root directory, activate the Python virtual environment, and execute `uvicorn main:app --reload`.
*   **Frontend Application:** Navigate to the frontend directory, configure the `.env.local` webhook URL, and run `npm run dev`.
*   **Automation Node:** Launch the local n8n instance using `npx n8n` and ensure the HTTP Request node points to the FastAPI local server.
*   **Repository Management:** Ensure all project updates are pushed upstream to the designated GitHub repository.
