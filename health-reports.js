document.addEventListener('DOMContentLoaded', () => {
  const reportUpload = document.getElementById('reportUpload');
  const fileNameSpan = document.getElementById('fileName');
  const summarizeReportBtn = document.getElementById('summarizeReport');
  const reportSummaryCard = document.getElementById('reportSummaryCard');
  const reportLoadingSpinner = document.getElementById('reportLoadingSpinner');
  const summaryText = document.getElementById('summaryText');

  // Function to reset report upload UI - made global for onclick in HTML
  window.resetReportUpload = () => {
    reportUpload.value = ''; // Clear file input
    fileNameSpan.textContent = 'No file chosen';
    summarizeReportBtn.disabled = true;
    reportSummaryCard.classList.add('hidden');
    reportLoadingSpinner.classList.add('hidden');
    summaryText.textContent = "Upload a report to see its summary...";
  };

  if (reportUpload) {
    reportUpload.addEventListener('change', (event) => {
      if (event.target.files.length > 0) {
        fileNameSpan.textContent = event.target.files[0].name;
        summarizeReportBtn.disabled = false;
        reportSummaryCard.classList.add('hidden'); // Hide previous summary
        summaryText.textContent = "Click 'Summarize Report' to get an AI summary.";
      } else {
        resetReportUpload();
      }
    });

    summarizeReportBtn.addEventListener('click', () => {
      if (reportUpload.files.length === 0) {
        summaryText.textContent = "Please choose a file to upload first.";
        return;
      }

      reportSummaryCard.classList.remove('hidden');
      reportLoadingSpinner.classList.remove('hidden');
      summaryText.textContent = 'Processing your report with AI...';

      const formData = new FormData();
      formData.append('report', reportUpload.files[0], reportUpload.files[0].name);

      fetch('http://127.0.0.1:5002/api/summarize-report', {
        method: 'POST',
        body: formData,
      })
        .then(async (res) => {
          const data = await res.json().catch(() => ({}));
          reportLoadingSpinner.classList.add('hidden');

          if (!res.ok) {
            summaryText.textContent = data.error || 'Summarization failed.';
            return;
          }

          const summary = data.summary || 'No summary returned.';
          summaryText.textContent = summary;
        })
        .catch((err) => {
          console.error('Report summarization request failed:', err);
          reportLoadingSpinner.classList.add('hidden');
          summaryText.textContent = 'Error: Could not summarize report. Please try again.';
        });
    });
  }
});
