from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Lead(BaseModel):
    name: str
    email: str
    company_size: str
    industry: str
    primary_goal: str
    isUrgent: bool = False

@app.post("/score-lead")
async def score_lead(lead: Lead):
    score = 0
    
    # 1. Firmographic Scoring 
    if "gmail.com" not in lead.email and "yahoo.com" not in lead.email:
        score += 10  
        
    if lead.company_size == "1000+":
        score += 60
    elif lead.company_size == "500-1000":
        score += 40
    elif lead.company_size == "200-500":
        score += 10
    elif lead.company_size == "50-200":
        score += 5        
        
    if lead.industry.lower() in ["saas", "finance", "technology"]:
        score += 10

    # 2. Intent Scoring / Checkbox Analysis
    if lead.isUrgent:
        score += 30
        
    contextual_keywords = ["automation", "integration", "workflow", "ai"]
    if any(word in lead.primary_goal.lower() for word in contextual_keywords):
        score += 30

    # 3. Determine Classification
    if score >= 60:
        tier = "Hot"
    elif score >= 40:
        tier = "Warm"
    else:
        tier = "Cold"

    return {
        "lead_name": lead.name, 
        "total_score": score, 
        "classification": tier,
        "isUrgent": lead.isUrgent
    }