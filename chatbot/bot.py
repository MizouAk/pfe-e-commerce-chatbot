import os
import re
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()

genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))


with open("knowledge.txt", "r", encoding="utf-8") as f:
    knowledge = f.read()

SYSTEM_PROMPT = f"""
You are a professional e-commerce assistant for a computer store in Morocco.

Your personality:
- Helpful
- Clear
- Concise
- Professional

Rules:
- Use ONLY the information provided below
- NEVER invent products or prices
- Recommend products based on budget and needs
- If multiple products match, suggest the best value
- If no product fits, clearly say so
- Ask follow-up questions if the user request is vague
- Answer in the same language as the user (French, English, or Arabic)
- If the question is unrelated, say you cannot help

Behavior Guidelines:
- If user asks for gaming → prioritize PC Gamer and GPUs
- If user asks for office/study → suggest budget-friendly options
- If user gives a budget → suggest products under that price
- If user does not give a budget → ask for their budget

Store Information:
{knowledge}
"""

model = genai.GenerativeModel(
    model_name="models/gemini-3-flash-preview",
    system_instruction=SYSTEM_PROMPT
)
print("🛍️  Support bot is running. Type 'quit' to exit.\n")


def extract_budget(text):
    numbers = re.findall(r"\d+\.?\d*", text)
    if numbers:
        return float(numbers[0])
    return None


while True:
    user_input = input("You: ")

    if user_input.lower() == "quit":
        break

    try:
        budget = extract_budget(user_input)

        if budget:
            enhanced_input = f"""
User budget: {budget} MAD

User request:
{user_input}

If products fit within this budget, recommend them.
If none fit, clearly say so.
"""
        else:
            enhanced_input = user_input

        response = model.generate_content(enhanced_input)

        print("\nBot:", response.text)
        print()

    except Exception as e:
        print("\nBot: Sorry, something went wrong. Please try again.")
        print("Error:", e)
        print()