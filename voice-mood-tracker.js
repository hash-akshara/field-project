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

          // Simulate AI analysis delay
          setTimeout(() => {
            moodLoadingSpinner.classList.add('hidden');
            const moods = ['Happy', 'Calm', 'Neutral', 'Anxious', 'Sad'];
            const randomMood = moods[Math.floor(Math.random() * moods.length)];
            moodText.innerHTML = `Your voice indicates a **${randomMood}** mood.`; // Use innerHTML for bolding

            // Generate dummy data for the chart
            const moodData = {
              labels: ['Happy', 'Calm', 'Neutral', 'Anxious', 'Sad'],
              datasets: [{
                label: 'Mood Distribution',
                data: [
                  Math.floor(Math.random() * 30) + 10, // Happy
                  Math.floor(Math.random() * 30) + 10, // Calm
                  Math.floor(Math.random() * 30) + 10, // Neutral
                  Math.floor(Math.random() * 20) + 5,  // Anxious
                  Math.floor(Math.random() * 20) + 5   // Sad
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

            // Destroy previous chart instance if it exists
            if (moodChartInstance) {
              moodChartInstance.destroy();
            }

            // Render new chart
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

          }, 3000); // Simulate AI analysis time
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
