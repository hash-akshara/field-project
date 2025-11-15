document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('header nav .nav-item');
  const mobileNavItems = document.querySelectorAll('.mobile-nav .nav-item');
  const contentSections = document.querySelectorAll('.content-section');
  const sosBtn = document.querySelector('.sos-btn');
  const sosModal = document.getElementById('sosModal');
  const closeButton = document.querySelector('.modal .close-button');
  const confirmSosBtn = document.getElementById('confirmSos');
  const cancelSosBtn = document.getElementById('cancelSos');
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');

  // --- General Section Display Logic ---
  const showSection = async (sectionId) => {
    contentSections.forEach(section => {
      section.classList.add('hidden');
    });

    // Handle dynamic loading for find-doctors
    if (sectionId === 'find-doctors-container') {
      const findDoctorsContainer = document.getElementById('find-doctors-container');
      findDoctorsContainer.classList.remove('hidden');

      // Fetch and insert find-doctors.html content if not already loaded
      if (!findDoctorsContainer.dataset.loaded) {
        try {
          const response = await fetch('find-doctors.html');
          const htmlContent = await response.text();
          findDoctorsContainer.innerHTML = htmlContent;
          findDoctorsContainer.dataset.loaded = 'true'; // Mark as loaded

          // Call the initialization function for find-doctors.js after content is loaded
          if (typeof initializeFindDoctorsPage === 'function') {
            initializeFindDoctorsPage();
          }

        } catch (error) {
          console.error('Error loading find-doctors.html:', error);
          findDoctorsContainer.innerHTML = '<p class="error-message">Failed to load Find Doctors section. Please try again.</p>';
        }
      }
    } else {
      document.getElementById(sectionId).classList.remove('hidden');
    }


    // Update active state for desktop nav
    navItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${sectionId}`) {
        item.classList.add('active');
      }
    });

    // Update active state for mobile nav
    mobileNavItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href') === `#${sectionId}`) {
        item.classList.add('active');
      }
    });

    // Hide mobile nav after selection
    if (mobileNav.classList.contains('active')) {
      mobileNav.classList.remove('active');
      menuToggle.querySelector('i').classList.remove('fa-times');
      menuToggle.querySelector('i').classList.add('fa-bars');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top of the section
  };

  // Set Dashboard as default view
  showSection('dashboard');

  // Event Listeners for main navigation
  navItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent default anchor jump
      const sectionId = item.getAttribute('href').substring(1);
      showSection(sectionId);
    });
  });

  // Event Listeners for mobile navigation
  mobileNavItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = item.getAttribute('href').substring(1);
      showSection(sectionId);
    });
  });

  // --- SOS Alert Modal Logic ---
  sosBtn.addEventListener('click', () => {
    sosModal.style.display = 'flex';
  });

  closeButton.addEventListener('click', () => {
    sosModal.style.display = 'none';
  });

  cancelSosBtn.addEventListener('click', () => {
    sosModal.style.display = 'none';
  });

  confirmSosBtn.addEventListener('click', () => {
    console.log('SOS Alert Sent! Emergency contacts and services notified.'); // Placeholder for actual SOS logic
    sosModal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === sosModal) {
      sosModal.style.display = 'none';
    }
  });

  // --- Mobile Menu Toggle ---
  menuToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    if (mobileNav.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times'); // 'X' icon for close
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars'); // Hamburger icon
    }
  });


  // --- Feature Specific Logic Placeholders ---

  // Placeholder for Language Toggle
  window.toggleLanguage = () => {
    console.log('Language toggled! (This would switch text content between English and Hindi)');
    // In a real application, you'd load different language strings
  };

  // Health Reports - File Upload
  const reportUpload = document.getElementById('reportUpload');
  const fileNameSpan = document.getElementById('fileName');
  const summarizeReportBtn = document.getElementById('summarizeReport');
  const summaryText = document.getElementById('summaryText');

  reportUpload.addEventListener('change', (event) => {
    if (event.target.files.length > 0) {
      fileNameSpan.textContent = event.target.files[0].name;
      summarizeReportBtn.disabled = false;
      summaryText.textContent = "Click 'Summarize Report' to get an AI summary.";
    } else {
      fileNameSpan.textContent = 'No file chosen';
      summarizeReportBtn.disabled = true;
      summaryText.textContent = "Upload a report to see its summary...";
    }
  });

  summarizeReportBtn.addEventListener('click', async () => {
    const file = reportUpload.files[0];
    if (!file) {
      summaryText.textContent = "Please select a file first.";
      return;
    }

    summaryText.textContent = 'Processing your report with AI...';
    summarizeReportBtn.disabled = true; // Disable button during processing

    const formData = new FormData();
    formData.append('report', file);

    try {
      const response = await fetch('http://localhost:5000/api/summarize-report', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        summaryText.textContent = `**AI Summary for ${fileNameSpan.textContent}:**\n\n${result.summary}`;
      } else {
        summaryText.textContent = `Error: ${result.error || 'Failed to get summary from server.'}`;
        console.error('Server error:', result.error);
      }
    } catch (error) {
      summaryText.textContent = 'Error: Could not connect to the server. Please ensure the backend is running.';
      console.error('Network or server error:', error);
    } finally {
      summarizeReportBtn.disabled = false;
    }
  });

  // Voice Mood Tracking - Basic Recording Placeholder
  const startRecordingBtn = document.getElementById('startRecording');
  const stopRecordingBtn = document.getElementById('stopRecording');
  const audioPlayback = document.getElementById('audioPlayback');
  const moodText = document.getElementById('moodText');
  let mediaRecorder;
  let audioChunks = [];

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
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
          audioPlayback.style.display = 'block';

          moodText.textContent = 'Analyzing your voice for mood...';

          const formData = new FormData();
          formData.append('audio', audioBlob, 'recording.wav');

          try {
            const response = await fetch('http://localhost:5000/api/analyze-mood', {
              method: 'POST',
              body: formData,
            });
            
            const result = await response.json();

            if (response.ok) {
              const dominantMood = result.mood;
              moodText.textContent = `**Mood Analysis Result:** Your voice suggests a "${dominantMood}" mood.`;
            } else {
              moodText.textContent = `Error: ${result.error || 'Failed to analyze mood.'}`;
              console.error('Server error:', result.error);
            }

          } catch (error) {
            moodText.textContent = 'Error: Could not connect to the server. Please ensure the backend is running.';
            console.error('Network or server error:', error);
          }
        };

        mediaRecorder.start();
        startRecordingBtn.disabled = true;
        stopRecordingBtn.disabled = false; // Enable stop button
        moodText.textContent = 'Recording started... Speak clearly.';
        audioPlayback.style.display = 'none'; // Hide player during recording
      } catch (err) {
        console.error('Error accessing microphone:', err);
        moodText.textContent = 'Error: Could not access microphone. Please ensure permissions are granted.';
      }
    });

    stopRecordingBtn.addEventListener('click', () => {
      if (mediaRecorder && mediaRecorder.state === 'recording') {
        mediaRecorder.stop();
        startRecordingBtn.disabled = false;
        stopRecordingBtn.disabled = true;
        moodText.textContent = 'Recording stopped. Analyzing...';
      }
    });
  } else {
    moodText.textContent = 'Voice recording is not supported in your browser.';
    startRecordingBtn.disabled = true;
    stopRecordingBtn.disabled = true;
  }

  // --- Chatbot Specific Logic ---
  const chatbotContainer = document.getElementById('chatbotContainer');
  const chatbotHeader = document.getElementById('chatbotHeader');
  const chatbotToggleBtn = document.getElementById('chatbotToggleBtn');
  const chatbotMessages = document.getElementById('chatbotMessages');
  const chatInput = document.getElementById('chatInput');
  const sendChatBtn = document.getElementById('sendChatBtn');

  let isChatbotMinimized = false;
  let chatHistory = []; // To store conversation history for the LLM

  // Initialize chat history with the bot's greeting
  chatHistory.push({ role: "model", parts: [{ text: "Hello! I'm MyHealthAI, your virtual assistant. How can I help you today?" }] });

  // Toggle Chatbot Minimize/Maximize
  const toggleChatbot = () => {
    isChatbotMinimized = !isChatbotMinimized;
    chatbotContainer.classList.toggle('minimized', isChatbotMinimized);
    chatbotToggleBtn.querySelector('i').className = isChatbotMinimized ? 'fas fa-plus' : 'fas fa-minus';
    // If maximized, scroll to bottom
    if (!isChatbotMinimized) {
      setTimeout(() => { // Give a small delay for CSS transition
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
      }, 300);
    }
  };

  chatbotHeader.addEventListener('click', (event) => {
    // Only toggle if not clicking the minimize/maximize button directly
    if (event.target !== chatbotToggleBtn && !chatbotToggleBtn.contains(event.target)) {
      toggleChatbot();
    }
  });

  chatbotToggleBtn.addEventListener('click', toggleChatbot);

  // Function to add a message to the chat
  const addMessage = (message, sender) => {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${sender}-message`);
    const p = document.createElement('p');
    p.textContent = message;
    messageDiv.appendChild(p);
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Scroll to bottom
  };

  // Function to show typing indicator
  const showTypingIndicator = () => {
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('message', 'bot-message', 'typing-indicator');
    typingDiv.id = 'typingIndicator'; // Add an ID to easily remove it
    typingDiv.innerHTML = `
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    `;
    chatbotMessages.appendChild(typingDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    return typingDiv;
  };

  // Function to remove typing indicator
  const removeTypingIndicator = () => {
    const typingDiv = document.getElementById('typingIndicator');
    if (typingDiv) {
      chatbotMessages.removeChild(typingDiv);
    }
  };

  // Send message functionality
  const sendMessage = async () => {
    const userMessage = chatInput.value.trim();
    if (userMessage === '') return;

    addMessage(userMessage, 'user');
    chatHistory.push({ role: "user", parts: [{ text: userMessage }] }); // Add user message to history
    chatInput.value = ''; // Clear input
    chatInput.style.height = 'auto'; // Reset textarea height

    showTypingIndicator(); // Show typing indicator

    try {
      const payload = { contents: chatHistory };
      // API Key provided by the user
      const apiKey = "AIzaSyBB0gpjuCtOEUMLZTLlVm_kNhhJd4SOv1A"; // Your API Key
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      removeTypingIndicator(); // Remove typing indicator once response is received

      if (result.candidates && result.candidates.length > 0 &&
          result.candidates[0].content && result.candidates[0].content.parts &&
          result.candidates[0].content.parts.length > 0) {
        const botResponse = result.candidates[0].content.parts[0].text;
        addMessage(botResponse, 'bot');
        chatHistory.push({ role: "model", parts: [{ text: botResponse }] }); // Add bot response to history
      } else {
        addMessage("Sorry, I couldn't get a response. Please try again.", 'bot');
        console.error("Unexpected API response structure:", result);
      }
    } catch (error) {
      removeTypingIndicator(); // Remove typing indicator on error
      console.error("Error calling Gemini API:", error);
      addMessage("Oops! Something went wrong. Please check your internet connection or try again later.", 'bot');
    }
  };

  sendChatBtn.addEventListener('click', sendMessage);

  chatInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter' && !event.shiftKey) { // Allow Shift+Enter for new line
      event.preventDefault(); // Prevent default new line on Enter
      sendMessage();
    }
  });

  // Adjust textarea height automatically
  chatInput.addEventListener('input', () => {
    chatInput.style.height = 'auto'; // Reset height
    chatInput.style.height = chatInput.scrollHeight + 'px'; // Set to scroll height
  });
});

// Initialize Find Doctors Page elements and event listeners
// This function will be called when the find-doctors.html content is loaded
function initializeFindDoctorsPage() {
  const symptomsInput = document.getElementById('symptomsInput');
  const locationInput = document.getElementById('locationInput');
  const searchDoctorsBtn = document.getElementById('searchDoctorsBtn');
  const doctorResultsContainer = document.getElementById('doctorResultsContainer');
  const doctorResultsGrid = document.getElementById('doctorResultsGrid');
  const initialSearchMessage = document.getElementById('initialSearchMessage');
  const doctorLoadingSpinner = document.getElementById('doctorLoadingSpinner');

  // Mock Doctor Data (moved here)
  const mockDoctors = [
    {
      id: 1,
      name: "Dr. Priya Sharma",
      specialty: "General Physician",
      location: "New Delhi",
      bio: "Experienced General Physician with a focus on family health and preventive care. Treats common illnesses like fever, cold, flu.",
      image: "https://placehold.co/100x100/3498db/ffffff?text=PS",
      symptoms: ["fever", "cold", "flu", "general checkup", "cough", "sore throat"]
    },
    {
      id: 2,
      name: "Dr. Rohan Gupta",
      specialty: "Dermatologist",
      location: "Mumbai",
      bio: "Leading dermatologist specializing in acne, eczema, psoriasis, and cosmetic dermatology.",
      image: "https://placehold.co/100x100/2ecc71/ffffff?text=RG",
      symptoms: ["acne", "rash", "eczema", "skin irritation", "hair loss"]
    },
    {
      id: 3,
      name: "Dr. Anjali Singh",
      specialty: "Pediatrician",
      location: "New Delhi",
      bio: "Dedicated pediatrician providing comprehensive care for infants, children, and adolescents. Specializes in childhood diseases and vaccinations.",
      image: "https://placehold.co/100x100/e74c3c/ffffff?text=AS",
      symptoms: ["child fever", "vaccination", "child rash", "pediatric checkup", "child flu"]
    },
    {
      id: 4,
      name: "Dr. Vikram Reddy",
      specialty: "Cardiologist",
      location: "Bengaluru",
      bio: "Top cardiologist with expertise in heart diseases, hypertension, and cardiac rehabilitation.",
      image: "https://placehold.co/100x100/f39c12/ffffff?text=VR",
      symptoms: ["chest pain", "heart palpitations", "high blood pressure", "cardiac issues"]
    },
    {
      id: 5,
      name: "Dr. Sneha Patel",
      specialty: "Orthopedic Surgeon",
      location: "Mumbai",
      bio: "Specializes in sports injuries, joint replacements, and musculoskeletal disorders.",
    image: "https://placehold.co/100x100/9b59b6/ffffff?text=SP",
      symptoms: ["joint pain", "fracture", "back pain", "knee injury", "arthritis"]
    },
    {
      id: 6,
      name: "Dr. Alok Kumar",
      specialty: "Neurologist",
      location: "New Delhi",
      bio: "Expert in treating neurological conditions including migraines, epilepsy, and stroke.",
      image: "https://placehold.co/100x100/1abc9c/ffffff?text=AK",
      symptoms: ["headache", "dizziness", "numbness", "seizures", "memory loss"]
    },
    {
      id: 7,
      name: "Dr. Meera Devi",
      specialty: "Gynecologist",
      location: "Chennai",
      bio: "Compassionate gynecologist providing women's health services, prenatal care, and reproductive health.",
      image: "https://placehold.co/100x100/f1c40f/ffffff?text=MD",
      symptoms: ["menstrual issues", "pregnancy", "PCOS", "women's health checkup"]
    }
  ];

  const displayDoctors = (doctors) => {
    doctorResultsGrid.innerHTML = ''; // Clear previous results
    initialSearchMessage.style.display = 'none'; // Hide initial message

    if (doctors.length === 0) {
      doctorResultsGrid.innerHTML = '<p class="no-results-message">No doctors found matching your criteria. Try a different search.</p>';
      return;
    }

    doctors.forEach(doctor => {
      const doctorCard = document.createElement('div');
      doctorCard.classList.add('doctor-card');
      doctorCard.innerHTML = `
        <img src="${doctor.image}" alt="${doctor.name}" class="doctor-avatar">
        <h3>${doctor.name}</h3>
        <p class="specialty">${doctor.specialty}</p>
        <p class="location"><i class="fas fa-map-marker-alt"></i> ${doctor.location}</p>
        <p class="bio">${doctor.bio}</p>
        <button class="btn-primary">Book Appointment</button>
      `;
      doctorResultsGrid.appendChild(doctorCard);
    });
  };

  // Ensure event listener is attached only once
  if (searchDoctorsBtn && !searchDoctorsBtn.dataset.listenerAttached) {
    searchDoctorsBtn.addEventListener('click', () => {
      const symptomsQuery = symptomsInput.value.toLowerCase().trim();
      const locationQuery = locationInput.value.toLowerCase().trim();

      doctorResultsGrid.innerHTML = ''; // Clear existing results
      initialSearchMessage.style.display = 'none'; // Hide "Start your search" message
      doctorLoadingSpinner.style.display = 'block'; // Show spinner

      setTimeout(() => { // Simulate API call delay
        doctorLoadingSpinner.style.display = 'none'; // Hide spinner

        let filteredDoctors = mockDoctors.filter(doctor => {
          const matchesSymptoms = symptomsQuery === '' ||
                                  doctor.specialty.toLowerCase().includes(symptomsQuery) ||
                                  doctor.symptoms.some(symptom => symptom.includes(symptomsQuery));

          const matchesLocation = locationQuery === '' ||
                                  doctor.location.toLowerCase().includes(locationQuery);

          return matchesSymptoms && matchesLocation;
        });

        displayDoctors(filteredDoctors);
      }, 1500); // 1.5 second delay
    });
    searchDoctorsBtn.dataset.listenerAttached = 'true'; // Mark listener as attached
  }
}

// Call the initialization function when the main script loads
// This ensures that if the find-doctors section is initially visible, its JS runs.
// For dynamically loaded content, this function will be called by showSection.
initializeFindDoctorsPage();
