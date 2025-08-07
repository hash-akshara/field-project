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
      console.log('Simulating report summarization for:', reportUpload.files[0].name);

      // Simulate AI analysis time
      setTimeout(() => {
        reportLoadingSpinner.classList.add('hidden');
        const dummySummary = `**AI Summary for ${fileNameSpan.textContent}:**\n\nThis report indicates a general good health status with minor observations. Key findings include stable vital signs and normal lab results. Recommendations include maintaining current lifestyle, regular exercise, and a balanced diet. A follow-up consultation in 6 months is advised to monitor progress. No critical issues identified.`;
        summaryText.textContent = dummySummary;
      }, 3000); // Simulate AI analysis time
    });
  }
});
