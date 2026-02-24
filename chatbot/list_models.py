import os
from dotenv import load_dotenv
from google import genai

load_dotenv()  

api_key = os.getenv("GOOGLE_API_KEY")
client = genai.Client(api_key=api_key)

models = client.list_models()
for m in models.data:
    print(f"- {m.name} | capabilities: {m.capabilities}")