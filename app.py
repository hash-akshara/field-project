import os
import json
import base64
import assemblyai as aai
import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS

# ================================================================
# API KEYS CONFIGURATION
# ================================================================
# Replace these with your actual API keys
aai.settings.api_key = "a0093f4084e742709ff2c17feb8fd043"
google_api_key = "AIzaSyDXIwX63L2AmCiimoXQP0f2aTWSTNhH3ws"

# Configure Google Generative AI globally
genai.configure(api_key=google_api_key)

# Initialize the Gemini model
gemini_model = genai.GenerativeModel(model_name="gemini-1.5-pro-latest")

# ================================================================
# FLASK APP INITIALIZATION
# ================================================================
app = Flask(__name__)
CORS(app)  # Allow all cross-origin requests

# ================================================================
# ROOT ENDPOINT
# ================================================================
@app.route("/")
def home():
    """Simple root endpoint to confirm that the server is running."""
    return "✅ The Flask backend server is running successfully!"

# ================================================================
# MOOD ANALYSIS ENDPOINT
# ================================================================
@app.route('/api/analyze-mood', methods=['POST'])
def analyze_mood():
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file found in the request'}), 400
    
    audio_file = request.files['audio']
    if audio_file.filename == '':
        return jsonify({'error': 'No selected audio file'}), 400

    temp_file_path = "temp_audio.wav"
    audio_file.save(temp_file_path)

    try:
        # Transcribe and analyze sentiment
        transcript = aai.Transcriber().transcribe(
            temp_file_path,
            config={'sentiment_analysis': True, 'speaker_labels': False}
        )

        # Check if transcription is complete
        if transcript.status == 'completed':
            # Summarize sentiment results
            sentiment_summary = {'positive': 0, 'negative': 0, 'neutral': 0}

            for result in transcript.sentiment_analysis:
                if result.sentiment == 'POSITIVE':
                    sentiment_summary['positive'] += 1
                elif result.sentiment == 'NEGATIVE':
                    sentiment_summary['negative'] += 1
                else:
                    sentiment_summary['neutral'] += 1

            total = sum(sentiment_summary.values())
            dominant_sentiment = max(sentiment_summary, key=sentiment_summary.get)

            result = {
                'mood': dominant_sentiment,
                'confidence': 1.0,
                'moodBreakdown': {
                    'happy': sentiment_summary['positive'] / total if total > 0 else 0,
                    'sad': sentiment_summary['negative'] / total if total > 0 else 0,
                    'neutral': sentiment_summary['neutral'] / total if total > 0 else 0,
                    'anxious': 0.01,
                    'calm': 0.01
                }
            }
            return jsonify(result)
        else:
            return jsonify({'error': f'Transcription failed with status: {transcript.status}'}), 500

    except Exception as e:
        print(f"⚠️ Error during mood analysis: {e}")
        return jsonify({'error': 'An internal error occurred during mood analysis.'}), 500

    finally:
        # Clean up temporary file
        if os.path.exists(temp_file_path):
            os.remove(temp_file_path)

# ================================================================
# HEALTH REPORT SUMMARIZATION ENDPOINT
# ================================================================
@app.route('/api/summarize-report', methods=['POST'])
def summarize_report():
    if 'report' not in request.files:
        return jsonify({'error': 'No report file found in the request'}), 400
    
    report_file = request.files['report']
    if report_file.filename == '':
        return jsonify({'error': 'No selected report file'}), 400

    try:
        # Decode the report file
        report_text = report_file.read().decode('utf-8')

        # Create prompt for Gemini model
        prompt = (
            "You are a medical AI assistant. "
            "Please summarize the key findings, insights, and recommendations "
            "from the following health report, and identify any critical or notable results:\n\n"
            f"{report_text}"
        )

        # Generate summary
        response = gemini_model.generate_content(prompt)
        summary = response.text

        return jsonify({'summary': summary})

    except Exception as e:
        print(f"⚠️ Error during report summarization: {e}")
        return jsonify({'error': 'An internal error occurred during summarization.'}), 500

# ================================================================
# RUN THE SERVER
# ================================================================
if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5002, debug=True)
