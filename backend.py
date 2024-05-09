from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import json

app = Flask(__name__)
CORS(app)


@app.route("/duffel-flights-search", methods=["POST"])
def duffel_flights_search():
    try:
        headers = {
            "Accept-Encoding": "gzip",
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Duffel-Version": "v1",
            "Authorization": "Bearer duffel_test_O6axsBfPB1YFwLk2tVJaNYXiFhITUnItVS8FJEtfpRp",
        }
        response = requests.post(
            "https://api.duffel.com/air/offer_requests",
            headers=headers,
            json=request.get_json(),
        )
        print("Response received from Duffel API")
        return jsonify(response.json()), response.status_code
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(port=5000, debug=True)
