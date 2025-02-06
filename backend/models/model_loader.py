from transformers import pipeline
import torch

# Load the model (use any transformer-based model like GPT-2 or a space-specific model)
model_name = "distilgpt2"  # Use GPT-2 or other models depending on your requirements
qa_pipeline = pipeline("text-generation", model=model_name, device=0 if torch.cuda.is_available() else -1)

def generate_answer(prompt):
    response = qa_pipeline(prompt, max_length=150, num_return_sequences=1)
    return response[0]['generated_text']




from transformers import BloomForCausalLM, BloomTokenizerFast

model_name = "bigscience/bloom-560m"  # Change to "bloom-7b1" for better answers
model = BloomForCausalLM.from_pretrained(model_name)
tokenizer = BloomTokenizerFast.from_pretrained(model_name)

def generate_answer(prompt):
    inputs = tokenizer(prompt, return_tensors="pt")
    outputs = model.generate(
        inputs["input_ids"], 
        max_length=1200,  # Increased max length
        temperature=0.7,  # Balanced creativity
        top_k=50,         # Filters unlikely words
        top_p=0.9         # Ensures diversity
    )
    return tokenizer.decode(outputs[0], skip_special_tokens=True)

# Example usage
print(generate_answer("Explain how black holes form and their impact on space."))


