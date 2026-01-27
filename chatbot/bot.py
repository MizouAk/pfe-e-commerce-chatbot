import google.generativeai as genai

genai.configure(api_key="AIzaSyCpjvFp9IGJuXjqGiKwc7xA4gvrT9X4gkg")

with open("knowledge.txt","r", encoding="utf-8") as f:
    knowledge = f.read()

SYSTEM_PROMPT= f"""
You are a customer support chatbot for a computer selling website.

Rules:
- Answer ONLY using the information provided
- Answer in the same language as the user (French or English or Arabic)
- If the question is unrelated , say you cannot help

Information:
{knowledge}
"""

model = genai.GenerativeModel(
    model_name="gemini-3-flash-preview",
    system_instruction=SYSTEM_PROMPT
)

print("Support bot is running. Type 'quit' to exit.\n")

while True:
    user_input = input("You: ")
    if user_input.lower() == "quit":
        break
    reponse = model.generate_content(user_input)
    print("Bot:",reponse.text)