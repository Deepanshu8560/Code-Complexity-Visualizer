from analyzer import analyze_code
import json

def test_analysis():
    # Test Python Simple
    code_py_simple = "print('hello')"
    res = analyze_code(code_py_simple, "python")
    print(f"Python Simple: {res}")
    assert res['time_complexity'] == "O(1)"

    # Test Python Loop
    code_py_loop = """
for i in range(10):
    print(i)
"""
    res = analyze_code(code_py_loop, "python")
    print(f"Python Loop: {res}")
    assert res['time_complexity'] == "O(n)"

    # Test Python Nested Loop
    code_py_nested = """
for i in range(n):
    for j in range(n):
        print(i, j)
"""
    res = analyze_code(code_py_nested, "python")
    print(f"Python Nested: {res}")
    assert res['time_complexity'] == "O(n^2)"

    # Test JS Loop
    code_js_loop = """
for (let i = 0; i < 10; i++) {
    console.log(i);
}
"""
    res = analyze_code(code_js_loop, "javascript")
    print(f"JS Loop: {res}")
    assert res['time_complexity'] == "O(n)"

    print("All tests passed!")

if __name__ == "__main__":
    test_analysis()
