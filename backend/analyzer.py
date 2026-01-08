import ast
import re

def analyze_code(code: str, language: str):
    if language.lower() == "python":
        return analyze_python(code)
    elif language.lower() in ["javascript", "js"]:
        return analyze_javascript(code)
    else:
        return {"error": "Unsupported language"}

def analyze_python(code: str):
    try:
        tree = ast.parse(code)
        
        class ComplexityVisitor(ast.NodeVisitor):
            def __init__(self):
                self.max_time_complexity = 0  # 0: O(1), 1: O(n), 2: O(n^2), etc.
                self.current_loop_depth = 0
                self.suggestions = []
                # Metrics
                self.loops = 0
                self.conditionals = 0
                self.recursion = 0
                self.array_ops = 0
                self.max_nesting = 0
                self.function_name = None

            def visit_FunctionDef(self, node):
                if self.function_name is None:
                    self.function_name = node.name
                self.generic_visit(node)

            def visit_For(self, node):
                self.loops += 1
                self.current_loop_depth += 1
                self.max_time_complexity = max(self.max_time_complexity, self.current_loop_depth)
                self.max_nesting = max(self.max_nesting, self.current_loop_depth)
                self.generic_visit(node)
                self.current_loop_depth -= 1

            def visit_While(self, node):
                self.loops += 1
                self.current_loop_depth += 1
                self.max_time_complexity = max(self.max_time_complexity, self.current_loop_depth)
                self.max_nesting = max(self.max_nesting, self.current_loop_depth)
                self.generic_visit(node)
                self.current_loop_depth -= 1
            
            def visit_If(self, node):
                self.conditionals += 1
                self.generic_visit(node)
            
            def visit_Call(self, node):
                # Check for recursive calls
                if isinstance(node.func, ast.Name) and node.func.id == self.function_name:
                    self.recursion += 1
                
                # Check for array operations (append, pop, sort, etc.)
                if isinstance(node.func, ast.Attribute) and isinstance(node.func.value, ast.Name):
                     # Heuristic: method calls on potential lists
                     if node.func.attr in ['append', 'pop', 'sort', 'extend', 'remove', 'insert']:
                         self.array_ops += 1

                self.generic_visit(node)
            
            def visit_Subscript(self, node):
                # Array access
                self.array_ops += 1
                self.generic_visit(node)

        visitor = ComplexityVisitor()
        visitor.visit(tree)
        
        # Determine Time Complexity
        if visitor.max_time_complexity == 0:
            time_comp = "O(1)"
        elif visitor.recursion > 0 and visitor.max_time_complexity == 0:
             # Very basic recursion detection
             time_comp = "O(2^n) or O(n!)" # Worst case assumption for recursion without loops
             visitor.suggestions.append("Recursive logic detected. Ensure base cases are efficient.")
        elif visitor.max_time_complexity == 1:
            time_comp = "O(n)"
        else:
            time_comp = f"O(n^{visitor.max_time_complexity})"
            visitor.suggestions.append(f"High nesting level ({visitor.max_time_complexity}). Consider refactoring.")

        # Suggestions based on metrics
        if visitor.recursion > 0:
             visitor.suggestions.append("Recursive calls detected. Consider iterative approach or memoization.")
        if visitor.loops > 3:
             visitor.suggestions.append(f"High loop count ({visitor.loops}). Can some be merged?")
        
        return {
            "time_complexity": time_comp,
            "space_complexity": "O(n)" if visitor.array_ops > 0 or visitor.recursion > 0 else "O(1)", # Heuristic update
            "metrics": {
                "loops": visitor.loops,
                "nested_loops": visitor.max_time_complexity, # Treating max nesting as nested_loops metric
                "conditionals": visitor.conditionals,
                "recursion": visitor.recursion,
                "array_ops": visitor.array_ops,
                "max_nesting": visitor.max_nesting
            },
            "suggestions": visitor.suggestions if visitor.suggestions else ["Code looks optimized."]
        }
    except SyntaxError as e:
        return {"error": f"Syntax Error: {e.msg} at line {e.lineno}"}
    except Exception as e:
         return {"error": f"Analysis Error: {str(e)}"}

def analyze_javascript(code: str):
    # Regex-based heuristic for JS
    suggestions = []
    
    # Count nesting of for/while/forEach/map
    # This is a string-based approximation and will be easily fooled by comments/strings.
    # But it suffices for a prototype.
    
    lines = code.split('\n')
    max_depth = 0
    current_depth = 0
    
    loop_patterns = [r'for\s*\(', r'while\s*\(', r'\.forEach\(', r'\.map\(']
    
    for line in lines:
        # Check for block open/close
        # This is extremely naive
        current_depth += line.count('{')
        current_depth -= line.count('}')
        
        # Check if line contains a loop start
        is_loop = any(re.search(p, line) for p in loop_patterns)
        
        if is_loop:
            # If we are inside a block depth d, and we start a loop, the loop is at depth d.
            # But we want to count *nested loops*.
            # Let's count indentation? No, unreliable.
            # Let's assume every loop increases complexity depth if it's inside another loop.
            pass
            
    # Better Regex approach:
    # Remove strings and comments first (todo)
    
    # Simple counting of nested structures that look like loops
    # For now, let's just count 'for' occurrences? No.
    
    # Let's try to match '{' depth when a loop header is found.
    
    depth = 0
    max_loop_depth = 0
    loop_depths = [] # Stack of depths where loops started
    
    tokens = re.split(r'(\{|\}|for\s*\(|while\s*\(|\.forEach\(|\.map\()', code)
    
    for token in tokens:
        token = token.strip()
        if not token: continue
        
        if token == '{':
            depth += 1
        elif token == '}':
            depth -= 1
            if loop_depths and depth < loop_depths[-1]:
                loop_depths.pop()
        elif any(token.startswith(x) for x in ['for', 'while', '.forEach', '.map']):
            # Found a loop opening
            # It usually is followed by '{' soon.
            # We count this as a loop layer.
            current_loop_nesting = len(loop_depths) + 1
            max_loop_depth = max(max_loop_depth, current_loop_nesting)
            loop_depths.append(depth) # Record the block depth where this loop lives
            
    if max_loop_depth == 0:
        time_comp = "O(1)"
    elif max_loop_depth == 1:
        time_comp = "O(n)"
    else:
        time_comp = f"O(n^{max_loop_depth})"
        suggestions.append(f"Detected {max_loop_depth} nested loops. Consider optimizing.")

    return {
        "time_complexity": time_comp,
        "space_complexity": "O(1)", # Helper
        "suggestions": suggestions if suggestions else ["Code looks optimized."],
        "metrics": {
            "loops": len(loop_depths) if 'loop_depths' in locals() else max_loop_depth, # Approx
            "nested_loops": max_loop_depth,
            "conditionals": code.count('if') + code.count('switch'),
            "recursion": 0, # Hard to detect with regex reliably
            "array_ops": 0,
            "max_nesting": max_loop_depth + depth
        }
    }
