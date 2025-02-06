from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from transformers import BloomForCausalLM, BloomTokenizerFast

# Load the model
model_name = "bigscience/bloom-560m"
model = BloomForCausalLM.from_pretrained(model_name)
tokenizer = BloomTokenizerFast.from_pretrained(model_name)

# Initialize FastAPI app
app = FastAPI()

# Allow CORS from any origin (this is just for development purposes)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins, change this for production to allow only specific origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# Define the root path
@app.get("/")
async def read_root():
    return {"message": "Welcome to the Astronuts API!"}

# Request model
class Query(BaseModel):
    prompt: str

# Route to generate answers
@app.post("/generate_answer/")
async def generate_answer(query: Query):
    # Tokenizing the input
    max_length = 512  # You can adjust this as needed, make sure it's a reasonable length for your model
    inputs = tokenizer(query.prompt, return_tensors="pt", padding=True, truncation=True, max_length=max_length)

    # Generate the output
    outputs = model.generate(
        inputs["input_ids"],
        attention_mask=inputs["attention_mask"],  # Pass the attention mask explicitly
        max_length=500,  # Set a reasonable max length for the answer
        num_return_sequences=1,  # We need just one answer
        do_sample=True,  # Enable randomness for diversity in the response
        temperature=0.7,  # Balance between randomness and coherence
        top_k=50,         # Limits the choices to the top k likely words
        top_p=0.9,        # Filters unlikely words, ensuring diversity
        no_repeat_ngram_size=2,  # Prevents repeating n-grams (to avoid repetition)
        pad_token_id=tokenizer.eos_token_id  # To ensure proper padding
    )

    # Decoding the output and returning it as the response
    answer = tokenizer.decode(outputs[0], skip_special_tokens=True)
    return {"answer": answer}
