from flask import Flask, request, jsonify
import threading

app = Flask(__name__)

count = 0

@app.route('/count', methods=['GET'])
def get_count():
    return jsonify({"count": count})

@app.route('/count', methods=['POST'])
def post_count():
    data = request.get_json()
    global count
    count += data.get("increment", 1)
    return jsonify({"received": data, "count": count}), 201

def run_flask():
    app.run(host="0.0.0.0", port=5000, debug=True)

if __name__ == "__main__":
    run_flask()