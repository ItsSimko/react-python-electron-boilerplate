from flask import Flask, request, jsonify
from flask_cors import CORS
import threading

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

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
    app.run(host="127.0.0.1", port=5000)

if __name__ == "__main__":
    run_flask()