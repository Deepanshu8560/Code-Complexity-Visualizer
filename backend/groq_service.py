import os
import json
import re
from groq import Groq

def analyze_with_groq(code: str, language: str):
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        raise ValueError("GROQ_API_KEY not found")

    client = Groq(api_key=api_key, timeout=10.0)

    prompt = f"""
    Analyze the following {language} code for Code Complexity.
    Return ONLY a valid JSON object. Do not use Markdown formatting (no ```json blocks).
    Focus specifically on providing actionable suggestions to improve Time and Space Complexity.
    The JSON object must have this exact structure:
    {{
        "time_complexity": "Big O notation (e.g. O(n))",
        "space_complexity": "Big O notation (e.g. O(1))",
        "suggestions": ["list of short, actionable optimization suggestions specifically for reducing time or space complexity"],
        "metrics": {{
            "loops": integer (count of loop structures),
            "nested_loops": integer (maximum nesting depth of loops),
            "conditionals": integer (count of if/switch statements),
            "recursion": integer (1 if recursion detected, 0 otherwise),
            "array_ops": integer (count of expensive array operations like insertions/deletions),
            "max_nesting": integer (maximum nesting depth of any block)
        }}
    }}

    Code to analyze:
    {code}
    """

    try:
        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "You are a code analysis expert. Return only JSON."},
                {"role": "user", "content": prompt}
            ],
            temperature=0,
            stream=False,
            response_format={"type": "json_object"}
        )
        
        text = completion.choices[0].message.content
        return json.loads(text)
    except Exception as e:
        print(f"Groq Analysis Error: {e}")
        raise e

def optimize_code_with_groq(code: str, language: str):
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        raise ValueError("GROQ_API_KEY not found")

    client = Groq(api_key=api_key, timeout=15.0)

    prompt = f"""
    You are an expert code optimizer. 
    Refactor the following {language} code to improve its Time and Space Complexity.
    
    1. EXPLAIN the changes briefly (what did you optimize and why).
    2. PROVIDE the completely refactored code in a markdown code block.
    3. State the NEW Time and Space Complexity explicitly at the end.

    Format the output as:
    **Explanation:**
    [Your explanation here]

    **Refactored Code:**
    ```python
    [Code here]
    ```

    **New Complexity:**
    - Time Complexity: [New O(n)]
    - Space Complexity: [New O(n)]

    Code to optimize:
    {code}
    """

    try:
        completion = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "You are an expert code optimizer."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.1,
        )
        return {"suggestion": completion.choices[0].message.content}
    except Exception as e:
        print(f"Groq Optimization Error: {e}")
        return {"error": str(e)}
