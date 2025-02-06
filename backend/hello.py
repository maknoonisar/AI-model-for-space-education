from dotenv import load_dotenv
import os
import openai  # Import openai, not OpenAI

# Load environment variables from the .env file
load_dotenv()

# Retrieve the API key from the environment
openai.api_key = os.getenv("OPENAI_API_KEY")  # Make sure the key is correct

# Test the API call
response = openai.ChatCompletion.create(
    messages=[{"role": "user", "content": "What is the capital of France?"}],
    model="gpt-4",
)

print(response['choices'][0]['message']['content'])
