import os
from dotenv import load_dotenv

load_dotenv(dotenv_path=".env")
print("DEBUG:", os.getenv("GOOGLE_API_KEY"))