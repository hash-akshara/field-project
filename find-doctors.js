// --- Find Doctors Page Logic ---
// This script assumes the HTML elements it targets are already present in the DOM.

// Mock Doctor Data - Enhanced for realism
const mockDoctors = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    specialty: "General Physician",
    location: "New Delhi",
    bio: "Dr. Sharma is a compassionate General Physician with 15+ years of experience in family health and preventive care. She is dedicated to treating common illnesses and promoting overall well-being.",
    image: "https://placehold.co/120x120/3498db/ffffff?text=P.S.", // Placeholder image
    symptoms: ["fever", "cold", "flu", "general checkup", "cough", "sore throat", "fatigue"],
    rating: 4.8,
    experience: "15 Years"
  },
  {
    id: 2,
    name: "Dr. Rohan Gupta",
    specialty: "Dermatologist",
    location: "Mumbai",
    bio: "A leading dermatologist with 10 years of expertise in advanced skin treatments, including acne, eczema, psoriasis, and aesthetic procedures. Dr. Gupta is known for his patient-centric approach.",
    image: "https://placehold.co/120x120/2ecc71/ffffff?text=R.G.", // Placeholder image
    symptoms: ["acne", "rash", "eczema", "skin irritation", "hair loss", "psoriasis"],
    rating: 4.9,
    experience: "10 Years"
  },
  {
    id: 3,
    name: "Dr. Anjali Singh",
    specialty: "Pediatrician",
    location: "New Delhi",
    bio: "Dr. Singh is a dedicated pediatrician providing comprehensive care for infants, children, and adolescents. With 12 years of experience, she specializes in childhood diseases, vaccinations, and developmental milestones.",
    image: "https://placehold.co/120x120/e74c3c/ffffff?text=A.S.", // Placeholder image
    symptoms: ["child fever", "vaccination", "child rash", "pediatric checkup", "child flu", "growth concerns"],
    rating: 4.7,
    experience: "12 Years"
  },
  {
    id: 4,
    name: "Dr. Vikram Reddy",
    specialty: "Cardiologist",
    location: "Bengaluru",
    bio: "A highly-regarded cardiologist with 20 years of experience, Dr. Reddy specializes in heart diseases, hypertension, and advanced cardiac rehabilitation. He is committed to improving cardiovascular health.",
    image: "https://placehold.co/120x120/f39c12/ffffff?text=V.R.", // Placeholder image
    symptoms: ["chest pain", "heart palpitations", "high blood pressure", "cardiac issues", "cholesterol"],
    rating: 4.9,
    experience: "20 Years"
  },
  {
    id: 5,
    name: "Dr. Sneha Patel",
    specialty: "Orthopedic Surgeon",
    location: "Mumbai",
    bio: "Dr. Patel is an expert orthopedic surgeon with 8 years of experience in sports injuries, joint replacements, and musculoskeletal disorders. She focuses on restoring mobility and improving quality of life.",
    image: "https://placehold.co/120x120/9b59b6/ffffff?text=S.P.", // Placeholder image
    symptoms: ["joint pain", "fracture", "back pain", "knee injury", "arthritis", "ligament tear"],
    rating: 4.6,
    experience: "8 Years"
  },
  {
    id: 6,
    name: "Dr. Alok Kumar",
    specialty: "Neurologist",
    location: "New Delhi",
    bio: "With 14 years in neurology, Dr. Kumar is adept at treating complex neurological conditions including migraines, epilepsy, and stroke. He is known for his thorough diagnostics and personalized care plans.",
    image: "https://placehold.co/120x120/1abc9c/ffffff?text=A.K.", // Placeholder image
    symptoms: ["headache", "dizziness", "numbness", "seizures", "memory loss", "tingling"],
    rating: 4.8,
    experience: "14 Years"
  },
  {
    id: 7,
    name: "Dr. Meera Devi",
    specialty: "Gynecologist",
    location: "Chennai",
    bio: "Dr. Devi is a compassionate gynecologist with 18 years of experience, providing comprehensive women's health services, prenatal care, and reproductive health solutions. She prioritizes patient comfort and education.",
    image: "https://placehold.co/120x120/f1c40f/ffffff?text=M.D.", // Placeholder image
    symptoms: ["menstrual issues", "pregnancy", "PCOS", "women's health checkup", "fertility"],
    rating: 4.7,
    experience: "18 Years"
  },
  {
    id: 8,
    name: "Dr. Sameer Khan",
    specialty: "Dentist",
    location: "Mumbai",
    bio: "Dr. Khan offers comprehensive dental care, from routine check-ups to advanced cosmetic procedures. He is committed to providing a comfortable and pain-free experience for all his patients.",
    image: "https://placehold.co/120x120/e67e22/ffffff?text=S.K.",
    symptoms: ["toothache", "cavity", "gum bleeding", "dental checkup", "braces"],
    rating: 4.5,
    experience: "7 Years"
  },
  {
    id: 9,
    name: "Dr. Ritu Verma",
    specialty: "Ophthalmologist",
    location: "Bengaluru",
    bio: "An experienced eye specialist, Dr. Verma provides expert care for various eye conditions, vision correction, and routine eye exams. She uses the latest technology for accurate diagnoses.",
    image: "https://placehold.co/120x120/8e44ad/ffffff?text=R.V.",
    symptoms: ["blurred vision", "eye pain", "red eyes", "vision check", "cataract"],
    rating: 4.6,
    experience: "11 Years"
  },
  {
    id: 10,
    name: "Dr. Arjun Das",
    specialty: "Gastroenterologist",
    location: "New Delhi",
    bio: "Dr. Das specializes in digestive system disorders, including acid reflux, IBS, and liver conditions. He offers personalized treatment plans focusing on patient comfort and long-term health.",
    image: "https://placehold.co/120x120/34495e/ffffff?text=A.D.",
    symptoms: ["stomach pain", "indigestion", "diarrhea", "constipation", "acid reflux"],
    rating: 4.8,
    experience: "16 Years"
  }
];

const displayDoctors = (doctors) => {
  const doctorResultsGrid = document.getElementById('doctorResultsGrid');
  const initialSearchMessage = document.getElementById('initialSearchMessage');

  if (!doctorResultsGrid || !initialSearchMessage) {
    console.error("Doctor results elements not found in DOM.");
    return;
  }

  doctorResultsGrid.innerHTML = ''; // Clear previous results
  initialSearchMessage.style.display = 'none'; // Hide initial message

  if (doctors.length === 0) {
    doctorResultsGrid.innerHTML = '<p class="no-results-message">No doctors found matching your criteria. Try a different search.</p>';
    return;
  }

  doctors.forEach(doctor => {
    const doctorCard = document.createElement('div');
    doctorCard.classList.add('doctor-card');

    // Generate star icons based on rating
    const stars = Array(5).fill('').map((_, i) => {
      return `<i class="fas fa-star ${i < Math.floor(doctor.rating) ? 'filled' : ''}"></i>`;
    }).join('');

    doctorCard.innerHTML = `
      <img src="${doctor.image}" alt="Dr. ${doctor.name}" class="doctor-avatar">
      <h3>Dr. ${doctor.name}</h3>
      <p class="specialty">${doctor.specialty}</p>
      <div class="rating">
        ${stars} <span>(${doctor.rating})</span>
      </div>
      <p class="location"><i class="fas fa-map-marker-alt"></i> ${doctor.location}</p>
      <p class="bio">${doctor.bio}</p>
      <button class="btn-primary">View Profile & Book</button>
    `;
    doctorResultsGrid.appendChild(doctorCard);
  });
};

// This function now initializes the page when the script is loaded
function initializeFindDoctorsPage() {
  const symptomsInput = document.getElementById('symptomsInput');
  const locationInput = document.getElementById('locationInput');
  const searchDoctorsBtn = document.getElementById('searchDoctorsBtn');
  const doctorLoadingSpinner = document.getElementById('doctorLoadingSpinner');

  // Check if elements exist before attaching listeners
  // This check is important for dynamically loaded content to prevent errors
  // if the script runs before the HTML elements are available.
  if (searchDoctorsBtn && !searchDoctorsBtn.dataset.listenerAttached) {
    searchDoctorsBtn.addEventListener('click', () => {
      const symptomsQuery = symptomsInput.value.toLowerCase().trim();
      const locationQuery = locationInput.value.toLowerCase().trim();

      const doctorResultsGrid = document.getElementById('doctorResultsGrid');
      const initialSearchMessage = document.getElementById('initialSearchMessage');
      
      // Clear existing results and show loading spinner
      if (doctorResultsGrid) doctorResultsGrid.innerHTML = '';
      if (initialSearchMessage) initialSearchMessage.style.display = 'none';
      if (doctorLoadingSpinner) doctorLoadingSpinner.style.display = 'block';

      setTimeout(() => { // Simulate API call delay
        if (doctorLoadingSpinner) doctorLoadingSpinner.style.display = 'none'; // Hide spinner

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
  // Optionally display all doctors on initial load of the standalone page
  // displayDoctors(mockDoctors);
}

// Call the initialization function when the DOM is fully loaded for standalone use
document.addEventListener('DOMContentLoaded', initializeFindDoctorsPage);
