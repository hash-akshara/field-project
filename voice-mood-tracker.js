// Ensure this script runs only after the DOM for the mood tracking section is loaded
document.addEventListener('DOMContentLoaded', () => {
  const startRecordingBtn = document.getElementById('startRecording');
  const stopRecordingBtn = document.getElementById('stopRecording');
  const audioPlayback = document.getElementById('audioPlayback');
  const recordingStatus = document.getElementById('recordingStatus');
  const recordingWave = document.getElementById('recordingWave');
  const moodResultsCard = document.getElementById('moodResultsCard');
  const moodLoadingSpinner = document.getElementById('moodLoadingSpinner');
  const moodText = document.getElementById('moodText');
  const moodChartCanvas = document.getElementById('moodChart');

  let mediaRecorder;
  let audioChunks = [];
  let moodChartInstance; // To store the Chart.js instance

  // Function to reset mood tracking UI - made global for onclick in HTML
  window.resetMoodTracking = () => {
    startRecordingBtn.disabled = false;
    stopRecordingBtn.disabled = true;
    audioPlayback.classList.add('hidden');
    audioPlayback.src = '';
    recordingStatus.textContent = 'Ready to record...';
    recordingWave.classList.add('hidden');
    moodResultsCard.classList.add('hidden');
    moodLoadingSpinner.classList.add('hidden');
    moodText.textContent = 'Your mood analysis will appear here.';
    if (moodChartInstance) {
      moodChartInstance.destroy(); // Destroy previous chart
      moodChartInstance = null; // Clear the instance
    }
  };

  if (startRecordingBtn) { // Check if elements exist before adding listeners
    startRecordingBtn.addEventListener('click', async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];

        mediaRecorder.ondataavailable = event => {
          audioChunks.push(event.data);
        };

        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(audioBlob);
          audioPlayback.src = audioUrl;
          audioPlayback.classList.remove('hidden');

          // Simulate sending audio to AI for analysis
          recordingStatus.textContent = 'Analyzing voice...';
          recordingWave.classList.add('hidden'); // Hide wave during analysis
          moodResultsCard.classList.remove('hidden');
          moodLoadingSpinner.classList.remove('hidden');
          moodText.textContent = 'Processing your voice for mood analysis...';

          try {
            const formData = new FormData();
            formData.append('audio', audioBlob, 'recording.wav');

            const response = await fetch('http://127.0.0.1:5002/api/analyze-mood', {
              method: 'POST',
              body: formData,
            });

            const data = await response.json();

            moodLoadingSpinner.classList.add('hidden');

            if (!response.ok) {
              moodText.textContent = data.error || 'Mood analysis failed.';
              return;
            }

            const mood = data.mood || 'Neutral';
            moodText.innerHTML = `Your voice indicates a **${mood}** mood.`; // Use innerHTML for bolding

            const breakdown = data.moodBreakdown || {};
            const moodData = {
              labels: ['Happy', 'Calm', 'Neutral', 'Anxious', 'Sad'],
              datasets: [{
                label: 'Mood Distribution',
                data: [
                  Math.round((breakdown.happy || 0) * 100),
                  Math.round((breakdown.calm || 0) * 100),
                  Math.round((breakdown.neutral || 0) * 100),
                  Math.round((breakdown.anxious || 0) * 100),
                  Math.round((breakdown.sad || 0) * 100)
                ],
                backgroundColor: [
                  'rgba(75, 192, 192, 0.6)', // Happy
                  'rgba(54, 162, 235, 0.6)', // Calm
                  'rgba(200, 200, 200, 0.6)', // Neutral
                  'rgba(255, 99, 132, 0.6)', // Anxious
                  'rgba(255, 159, 64, 0.6)'  // Sad
                ],
                borderColor: [
                  'rgba(75, 192, 192, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(200, 200, 200, 1)',
                  'rgba(255, 99, 132, 1)',
                  'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
              }]
            };

            if (moodChartInstance) {
              moodChartInstance.destroy();
            }

            moodChartInstance = new Chart(moodChartCanvas, {
              type: 'pie', // Using pie chart for mood distribution
              data: moodData,
              options: {
                responsive: true,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: true,
                    text: 'Overall Mood Composition'
                  }
                }
              },
            });
          } catch (err) {
            console.error('Mood analysis request failed:', err);
            moodLoadingSpinner.classList.add('hidden');
            moodText.textContent = 'Error: Could not analyze mood. Please try again.';
          }
        };

        mediaRecorder.start();
        recordingStatus.textContent = 'Recording...';
        recordingWave.classList.remove('hidden');
        startRecordingBtn.disabled = true;
        stopRecordingBtn.disabled = false;
        audioPlayback.classList.add('hidden'); // Hide playback during recording
        moodResultsCard.classList.add('hidden'); // Hide results card during new recording

      } catch (err) {
        console.error('Error accessing microphone:', err);
        recordingStatus.textContent = 'Error: Could not access microphone. Please allow access.';
        startRecordingBtn.disabled = false;
        stopRecordingBtn.disabled = true;
      }
    });

    stopRecordingBtn.addEventListener('click', () => {
      if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
        recordingStatus.textContent = 'Recording stopped. Analyzing...';
        startRecordingBtn.disabled = true; // Keep disabled until analysis is done or reset
        stopRecordingBtn.disabled = true;
      }
    });
  }
});
