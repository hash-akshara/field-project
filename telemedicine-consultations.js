document.addEventListener('DOMContentLoaded', () => {
  const scheduleConsultationForm = document.getElementById('scheduleConsultationForm');
  const doctorSelect = document.getElementById('doctorSelect');
  const consultationDate = document.getElementById('consultationDate');
  const consultationTime = document.getElementById('consultationTime');
  const consultationReason = document.getElementById('consultationReason');
  const upcomingConsultationsList = document.getElementById('upcomingConsultationsList');
  const consultationLoadingSpinner = document.getElementById('consultationLoadingSpinner');
  const noConsultationsMessage = upcomingConsultationsList ? upcomingConsultationsList.querySelector('.no-consultations-message') : null;

  // Mock data for consultations (in a real app, this would come from a backend/Firestore)
  let mockConsultations = [
    { id: 'c1', doctor: 'Dr. Anya Sharma - General Physician', date: '2025-08-10', time: '10:00', reason: 'Annual check-up' },
    { id: 'c2', doctor: 'Dr. Rohan Mehta - Dermatologist', date: '2025-08-15', time: '14:30', reason: 'Skin rash evaluation' },
  ];

  // Function to display upcoming consultations
  const displayConsultations = () => {
    upcomingConsultationsList.innerHTML = ''; // Clear existing
    if (mockConsultations.length === 0) {
      if (noConsultationsMessage) {
        noConsultationsMessage.style.display = 'block';
      } else {
        upcomingConsultationsList.innerHTML = '<p class="no-consultations-message">No upcoming consultations. Schedule one above!</p>';
      }
      return;
    } else {
      if (noConsultationsMessage) {
        noConsultationsMessage.style.display = 'none';
      }
    }

    // Sort consultations by date and time
    mockConsultations.sort((a, b) => {
      const dateTimeA = new Date(`${a.date}T${a.time}`);
      const dateTimeB = new Date(`${b.date}T${b.time}`);
      return dateTimeA - dateTimeB;
    });

    mockConsultations.forEach(consultation => {
      const consultationItem = document.createElement('div');
      consultationItem.classList.add('consultation-item');
      consultationItem.dataset.id = consultation.id; // Store ID for actions

      const formattedDate = new Date(`${consultation.date}T${consultation.time}`).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      });
      const formattedTime = new Date(`${consultation.date}T${consultation.time}`).toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', hour12: true
      });

      consultationItem.innerHTML = `
        <h4>${consultation.doctor}</h4>
        <p class="meta-info"><i class="fas fa-calendar-alt"></i> Date: ${formattedDate}</p>
        <p class="meta-info"><i class="fas fa-clock"></i> Time: ${formattedTime}</p>
        <p><strong>Reason:</strong> ${consultation.reason}</p>
        <div class="actions">
          <button class="btn-primary join-call-btn" data-id="${consultation.id}"><i class="fas fa-video"></i> Join Call</button>
          <button class="btn-danger cancel-consultation-btn" data-id="${consultation.id}"><i class="fas fa-times-circle"></i> Cancel</button>
        </div>
      `;
      upcomingConsultationsList.appendChild(consultationItem);
    });

    // Add event listeners for new buttons
    document.querySelectorAll('.join-call-btn').forEach(button => {
      button.addEventListener('click', (e) => joinConsultationCall(e.target.dataset.id));
    });
    document.querySelectorAll('.cancel-consultation-btn').forEach(button => {
      button.addEventListener('click', (e) => cancelConsultation(e.target.dataset.id));
    });
  };

  // Function to handle scheduling a new consultation
  if (scheduleConsultationForm) {
    scheduleConsultationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const doctor = doctorSelect.value;
      const date = consultationDate.value;
      const time = consultationTime.value;
      const reason = consultationReason.value;

      // Basic validation
      if (!doctor || !date || !time || !reason) {
        alert('Please fill in all fields.');
        return;
      }

      const newConsultation = {
        id: `c${mockConsultations.length + 1}`, // Simple ID generation
        doctor,
        date,
        time,
        reason
      };

      consultationLoadingSpinner.classList.remove('hidden');
      setTimeout(() => { // Simulate API call
        mockConsultations.push(newConsultation);
        scheduleConsultationForm.reset(); // Clear form
        displayConsultations();
        consultationLoadingSpinner.classList.add('hidden');
        alert('Consultation scheduled successfully!');
        console.log('Consultation scheduled:', newConsultation);
      }, 1000);
    });
  }

  // Function to join a consultation call (simulated)
  const joinConsultationCall = (id) => {
    const consultation = mockConsultations.find(c => c.id === id);
    if (consultation) {
      alert(`Joining call for ${consultation.doctor} on ${consultation.date} at ${consultation.time}.\n\n(This is a simulated video call. In a real app, you'd be redirected to a video conferencing platform.)`);
      console.log('Attempting to join call for:', consultation);
    }
  };

  // Function to cancel a consultation
  const cancelConsultation = (id) => {
    if (confirm('Are you sure you want to cancel this consultation?')) {
      consultationLoadingSpinner.classList.remove('hidden');
      setTimeout(() => { // Simulate API call
        mockConsultations = mockConsultations.filter(c => c.id !== id);
        displayConsultations();
        consultationLoadingSpinner.classList.add('hidden');
        alert('Consultation cancelled successfully.');
        console.log('Consultation cancelled:', id);
      }, 500);
    }
  };

  // Initial display of consultations when the page loads
  if (document.getElementById('telemedicine-consultations-content')) { // Only run if the section exists
    displayConsultations();
  }
});
