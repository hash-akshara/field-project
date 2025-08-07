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
    experience: "15 Years",
    fees: { min: 500, max: 1500 }
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
    experience: "10 Years",
    fees: { min: 800, max: 2500 }
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
    experience: "12 Years",
    fees: { min: 600, max: 1800 }
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
    experience: "20 Years",
    fees: { min: 1500, max: 5000 }
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
    experience: "8 Years",
    fees: { min: 1000, max: 4000 }
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
    experience: "14 Years",
    fees: { min: 1200, max: 4500 }
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
    experience: "18 Years",
    fees: { min: 900, max: 3000 }
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
    experience: "7 Years",
    fees: { min: 400, max: 1200 }
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
    experience: "11 Years",
    fees: { min: 700, max: 2000 }
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
    experience: "16 Years",
    fees: { min: 1100, max: 3500 }
  },
  {
    id: 11,
    name: "Dr. Kiran Rao",
    specialty: "General Physician",
    location: "Mumbai",
    bio: "Dr. Rao is a dedicated general practitioner with 8 years of experience. He provides preventive care, manages chronic diseases, and treats a wide range of common health issues for all ages.",
    image: "https://placehold.co/120x120/7f8c8d/ffffff?text=K.R.",
    symptoms: ["fever", "cold", "flu", "cough", "fatigue", "headache", "diabetes management"],
    rating: 4.5,
    experience: "8 Years",
    fees: { min: 450, max: 1300 }
  },
  {
    id: 12,
    name: "Dr. Aarti Shah",
    specialty: "Dermatologist",
    location: "New Delhi",
    bio: "With a focus on cosmetic and medical dermatology, Dr. Shah has 6 years of experience treating skin, hair, and nail conditions. She is skilled in laser treatments and chemical peels.",
    image: "https://placehold.co/120x120/c0392b/ffffff?text=A.S.",
    symptoms: ["acne", "hair loss", "pigmentation", "skin infection", "warts", "psoriasis"],
    rating: 4.7,
    experience: "6 Years",
    fees: { min: 750, max: 2000 }
  },
  {
    id: 13,
    name: "Dr. Ramesh Iyer",
    specialty: "ENT Specialist",
    location: "Bengaluru",
    bio: "Dr. Iyer is an experienced ENT specialist with 14 years of practice, focusing on ear, nose, and throat disorders. He is known for his precise diagnoses and compassionate care.",
    image: "https://placehold.co/120x120/6a1b9a/ffffff?text=R.I.",
    symptoms: ["ear pain", "sore throat", "sinus", "hearing loss", "dizziness"],
    rating: 4.7,
    experience: "14 Years",
    fees: { min: 900, max: 3000 }
  },
  {
    id: 14,
    name: "Dr. Nikita Singh",
    specialty: "Psychiatrist",
    location: "Mumbai",
    bio: "Dr. Singh is a leading psychiatrist with 10 years of experience, specializing in mental health, anxiety, depression, and stress management. She provides a supportive and confidential environment for her patients.",
    image: "https://placehold.co/120x120/1a237e/ffffff?text=N.S.",
    symptoms: ["anxiety", "depression", "stress", "sleep issues", "mood swings"],
    rating: 4.9,
    experience: "10 Years",
    fees: { min: 1500, max: 5000 }
  },
  {
    id: 15,
    name: "Dr. Sanjay Verma",
    specialty: "Urologist",
    location: "New Delhi",
    bio: "A urologist with 18 years of experience, Dr. Verma treats conditions of the urinary tract and male reproductive system. He is an expert in kidney stones, prostate issues, and urinary infections.",
    image: "https://placehold.co/120x120/bf360c/ffffff?text=S.V.",
    symptoms: ["urinary infection", "kidney stones", "prostate issues", "blood in urine"],
    rating: 4.6,
    experience: "18 Years",
    fees: { min: 1200, max: 4000 }
  },
  {
    id: 16,
    name: "Dr. Aditi Rao",
    specialty: "Endocrinologist",
    location: "Bengaluru",
    bio: "Dr. Rao specializes in the endocrine system, focusing on diabetes, thyroid disorders, and hormonal imbalances. She has 9 years of experience and is committed to long-term patient health.",
    image: "https://placehold.co/120x120/004d40/ffffff?text=A.R.",
    symptoms: ["diabetes", "thyroid issues", "hormonal imbalance", "weight gain"],
    rating: 4.7,
    experience: "9 Years",
    fees: { min: 1100, max: 3500 }
  },
  {
    id: 17,
    name: "Dr. Rahul Sharma",
    specialty: "Oncologist",
    location: "Mumbai",
    bio: "An oncologist with 22 years of experience, Dr. Sharma provides comprehensive cancer care, including diagnosis, treatment, and follow-up. He is a leading expert in his field.",
    image: "https://placehold.co/120x120/b71c1c/ffffff?text=R.S.",
    symptoms: ["cancer screening", "chemotherapy", "radiation therapy", "tumor"],
    rating: 4.9,
    experience: "22 Years",
    fees: { min: 2000, max: 10000 }
  },
  {
    id: 18,
    name: "Dr. Sunita Patel",
    specialty: "Pulmonologist",
    location: "Chennai",
    bio: "Dr. Patel has 16 years of experience in pulmonology, treating conditions like asthma, COPD, and lung infections. She is a dedicated and skilled lung specialist.",
    image: "https://placehold.co/120x120/4a148c/ffffff?text=S.P.",
    symptoms: ["asthma", "cough", "breathing difficulty", "COPD", "lung infection"],
    rating: 4.8,
    experience: "16 Years",
    fees: { min: 1000, max: 3800 }
  },
  {
    id: 19,
    name: "Dr. Gautam Singh",
    specialty: "Nephrologist",
    location: "New Delhi",
    bio: "With 13 years of experience, Dr. Singh is a nephrologist specializing in kidney diseases, hypertension, and dialysis. He provides expert care for complex kidney conditions.",
    image: "https://placehold.co/120x120/1b5e20/ffffff?text=G.S.",
    symptoms: ["kidney disease", "high blood pressure", "dialysis", "urinary issues"],
    rating: 4.7,
    experience: "13 Years",
    fees: { min: 1300, max: 4200 }
  },
  {
    id: 20,
    name: "Dr. Neha Malik",
    specialty: "Rheumatologist",
    location: "Mumbai",
    bio: "Dr. Malik is an expert in rheumatology with 11 years of experience, treating arthritis, autoimmune diseases, and musculoskeletal pain. She focuses on improving mobility and quality of life.",
    image: "https://placehold.co/120x120/d81b60/ffffff?text=N.M.",
    symptoms: ["arthritis", "joint pain", "lupus", "rheumatoid arthritis", "gout"],
    rating: 4.6,
    experience: "11 Years",
    fees: { min: 950, max: 3200 }
  },
  {
    id: 21,
    name: "Dr. Vivek Kumar",
    specialty: "Physiotherapist",
    location: "Bengaluru",
    bio: "A physiotherapist with 7 years of experience, Dr. Kumar helps patients recover from injuries, manage chronic pain, and improve physical function through personalized exercise plans and therapy.",
    image: "https://placehold.co/120x120/006064/ffffff?text=V.K.",
    symptoms: ["back pain", "sports injury", "rehabilitation", "stiffness", "post-op recovery"],
    rating: 4.8,
    experience: "7 Years",
    fees: { min: 400, max: 1500 }
  },
  {
    id: 22,
    name: "Dr. Shreya Joshi",
    specialty: "Dietitian & Nutritionist",
    location: "New Delhi",
    bio: "Dr. Joshi is a certified dietitian with 8 years of experience, providing personalized nutrition plans for weight management, chronic disease control, and overall wellness.",
    image: "https://placehold.co/120x120/ef6c00/ffffff?text=S.J.",
    symptoms: ["weight loss", "nutrition plan", "diabetes diet", "gut health", "eating disorders"],
    rating: 4.9,
    experience: "8 Years",
    fees: { min: 600, max: 2000 }
  },
  {
    id: 23,
    name: "Dr. Manish Aggarwal",
    specialty: "Plastic Surgeon",
    location: "Mumbai",
    bio: "With 20 years of expertise, Dr. Aggarwal is a renowned plastic surgeon specializing in reconstructive and cosmetic surgery. He is committed to providing natural and beautiful results.",
    image: "https://placehold.co/120x120/424242/ffffff?text=M.A.",
    symptoms: ["cosmetic surgery", "reconstructive surgery", "burns", "scar revision"],
    rating: 4.8,
    experience: "20 Years",
    fees: { min: 5000, max: 50000 }
  },
  {
    id: 24,
    name: "Dr. Tina Fernandes",
    specialty: "General Physician",
    location: "New Delhi",
    bio: "Dr. Fernandes is a dedicated General Physician with 10 years of experience, providing comprehensive care for families and individuals. She is known for her attentive and thorough approach.",
    image: "https://placehold.co/120x120/3949ab/ffffff?text=T.F.",
    symptoms: ["general checkup", "viral fever", "cough", "headache", "vaccination"],
    rating: 4.7,
    experience: "10 Years",
    fees: { min: 600, max: 1500 }
  },
  {
    id: 25,
    name: "Dr. Preeti Verma",
    specialty: "Dermatologist",
    location: "Bengaluru",
    bio: "A dermatologist with 7 years of experience, Dr. Verma specializes in skin, hair, and nail health. She provides treatments for common and complex dermatological conditions.",
    image: "https://placehold.co/120x120/c62828/ffffff?text=P.V.",
    symptoms: ["acne", "hair fall", "dandruff", "pigmentation", "skin allergies"],
    rating: 4.8,
    experience: "7 Years",
    fees: { min: 700, max: 2200 }
  },
  {
    id: 26,
    name: "Dr. Arun Das",
    specialty: "Pediatrician",
    location: "Mumbai",
    bio: "Dr. Das is a child specialist with 15 years of experience, providing expert care for pediatric health, from routine check-ups to managing complex childhood illnesses.",
    image: "https://placehold.co/120x120/ad1457/ffffff?text=A.D.",
    symptoms: ["child fever", "stomach ache", "cold", "growth issues", "newborn care"],
    rating: 4.9,
    experience: "15 Years",
    fees: { min: 750, max: 2000 }
  },
  {
    id: 27,
    name: "Dr. Shweta Joshi",
    specialty: "Cardiologist",
    location: "New Delhi",
    bio: "An experienced cardiologist with 18 years in practice, Dr. Joshi focuses on preventive cardiology and advanced heart disease treatments. She is a trusted name in cardiac care.",
    image: "https://placehold.co/120x120/6a1b9a/ffffff?text=S.J.",
    symptoms: ["chest pain", "arrhythmia", "high blood pressure", "heart failure"],
    rating: 4.9,
    experience: "18 Years",
    fees: { min: 1800, max: 6000 }
  },
  {
    id: 28,
    name: "Dr. Ajay Kumar",
    specialty: "Orthopedic Surgeon",
    location: "Chennai",
    bio: "Dr. Kumar is a leading orthopedic surgeon with 12 years of experience, specializing in joint replacement and trauma surgery. He is dedicated to restoring mobility and function.",
    image: "https://placehold.co/120x120/1565c0/ffffff?text=A.K.",
    symptoms: ["knee pain", "hip replacement", "fractures", "ligament injury"],
    rating: 4.7,
    experience: "12 Years",
    fees: { min: 1500, max: 5000 }
  },
  {
    id: 29,
    name: "Dr. Jyoti Devi",
    specialty: "Neurologist",
    location: "Hyderabad",
    bio: "With 16 years of experience, Dr. Devi is a neurologist who treats a wide range of neurological disorders, including stroke, epilepsy, and multiple sclerosis. Her approach is patient-centered.",
    image: "https://placehold.co/120x120/00838f/ffffff?text=J.D.",
    symptoms: ["epilepsy", "stroke", "migraine", "nerve pain", "tremors"],
    rating: 4.8,
    experience: "16 Years",
    fees: { min: 1400, max: 4800 }
  },
  {
    id: 30,
    name: "Dr. Vikram Singh",
    specialty: "Gynecologist",
    location: "New Delhi",
    bio: "Dr. Singh is a respected gynecologist with 20 years of experience in women's health. He provides care for all stages of a woman's life, from adolescence to menopause.",
    image: "https://placehold.co/120x120/558b2f/ffffff?text=V.S.",
    symptoms: ["pregnancy care", "PCOD", "menopause", "fertility issues", "uterine fibroids"],
    rating: 4.8,
    experience: "20 Years",
    fees: { min: 1100, max: 3500 }
  },
  {
    id: 31,
    name: "Dr. Alisha Khan",
    specialty: "Dentist",
    location: "Mumbai",
    bio: "A highly-skilled dentist with 9 years of experience, Dr. Khan offers a wide range of dental services, including root canals, crowns, and cosmetic dentistry.",
    image: "https://placehold.co/120x120/c0ca33/ffffff?text=A.K.",
    symptoms: ["toothache", "cavity", "root canal", "dental implants", "whitening"],
    rating: 4.6,
    experience: "9 Years",
    fees: { min: 500, max: 2000 }
  },
  {
    id: 32,
    name: "Dr. Rajesh Gupta",
    specialty: "Ophthalmologist",
    location: "Bengaluru",
    bio: "Dr. Gupta is an eye specialist with 14 years of experience in diagnosing and treating eye conditions. He is an expert in cataract surgery and laser vision correction.",
    image: "https://placehold.co/120x120/e53935/ffffff?text=R.G.",
    symptoms: ["cataract", "glaucoma", "retina issues", "vision correction"],
    rating: 4.8,
    experience: "14 Years",
    fees: { min: 800, max: 2500 }
  },
  {
    id: 33,
    name: "Dr. Kavita Rao",
    specialty: "Gastroenterologist",
    location: "Chennai",
    bio: "An expert gastroenterologist with 10 years of experience, Dr. Rao specializes in digestive health, liver diseases, and endoscopic procedures. She is known for her clear communication.",
    image: "https://placehold.co/120x120/8e24aa/ffffff?text=K.R.",
    symptoms: ["stomach pain", "acid reflux", "IBS", "liver issues", "colonoscopy"],
    rating: 4.7,
    experience: "10 Years",
    fees: { min: 1300, max: 4000 }
  },
  {
    id: 34,
    name: "Dr. Anil Sharma",
    specialty: "General Physician",
    location: "Pune",
    bio: "Dr. Sharma is a dedicated General Physician with 12 years of experience, focused on preventive medicine and managing chronic conditions. He takes a holistic approach to patient health.",
    image: "https://placehold.co/120x120/004d40/ffffff?text=A.S.",
    symptoms: ["fatigue", "diabetes management", "hypertension", "thyroid issues", "general checkup"],
    rating: 4.6,
    experience: "12 Years",
    fees: { min: 550, max: 1800 }
  },
  {
    id: 35,
    name: "Dr. Riya Patel",
    specialty: "Dermatologist",
    location: "Hyderabad",
    bio: "A dermatologist with 8 years of experience, Dr. Patel specializes in cosmetic dermatology, treating skin aging, wrinkles, and blemishes with the latest non-invasive techniques.",
    image: "https://placehold.co/120x120/4e342e/ffffff?text=R.P.",
    symptoms: ["anti-aging", "wrinkles", "acne scars", "laser treatment", "fillers"],
    rating: 4.9,
    experience: "8 Years",
    fees: { min: 1000, max: 4000 }
  },
  {
    id: 36,
    name: "Dr. Siddharth Jain",
    specialty: "Cardiologist",
    location: "Mumbai",
    bio: "Dr. Jain is a highly-skilled cardiologist with 14 years of experience, specializing in interventional cardiology and cardiac diagnostics. He is a key opinion leader in his field.",
    image: "https://placehold.co/120x120/00796b/ffffff?text=S.J.",
    symptoms: ["heart attack", "angina", "coronary artery disease", "stenting"],
    rating: 4.9,
    experience: "14 Years",
    fees: { min: 2000, max: 8000 }
  },
  {
    id: 37,
    name: "Dr. Pallavi Sharma",
    specialty: "Orthopedic Surgeon",
    location: "New Delhi",
    bio: "Dr. Sharma is a skilled orthopedic surgeon with 10 years of experience, specializing in spine and back problems. She provides both surgical and non-surgical treatments for her patients.",
    image: "https://placehold.co/120x120/f9a825/ffffff?text=P.S.",
    symptoms: ["back pain", "sciatica", "slipped disc", "spine surgery"],
    rating: 4.8,
    experience: "10 Years",
    fees: { min: 1800, max: 6000 }
  },
  {
    id: 38,
    name: "Dr. Sumit Banerjee",
    specialty: "Pediatrician",
    location: "Bengaluru",
    bio: "A pediatrician with 8 years of experience, Dr. Banerjee is passionate about child health and development. He offers a friendly and reassuring environment for his young patients.",
    image: "https://placehold.co/120x120/607d8b/ffffff?text=S.B.",
    symptoms: ["newborn care", "childhood diseases", "asthma in children", "growth charts"],
    rating: 4.7,
    experience: "8 Years",
    fees: { min: 650, max: 1900 }
  },
  {
    id: 39,
    name: "Dr. Farhan Ali",
    specialty: "Neurologist",
    location: "Mumbai",
    bio: "Dr. Ali has 17 years of experience in neurology, focusing on stroke prevention, headache management, and movement disorders. He uses a combination of medicine and lifestyle changes.",
    image: "https://placehold.co/120x120/d500f9/ffffff?text=F.A.",
    symptoms: ["stroke", "parkinson's disease", "headache", "dizziness"],
    rating: 4.8,
    experience: "17 Years",
    fees: { min: 1500, max: 5500 }
  },
  {
    id: 40,
    name: "Dr. Leela Nair",
    specialty: "Gynecologist",
    location: "Chennai",
    bio: "Dr. Nair is an empathetic gynecologist with 15 years of experience, specializing in maternity care, family planning, and minimally invasive gynecological procedures.",
    image: "https://placehold.co/120x120/5d4037/ffffff?text=L.N.",
    symptoms: ["maternity care", "family planning", "infertility", "cervical cancer screening"],
    rating: 4.7,
    experience: "15 Years",
    fees: { min: 900, max: 3000 }
  },
  {
    id: 41,
    name: "Dr. Ankit Desai",
    specialty: "Urologist",
    location: "Bengaluru",
    bio: "Dr. Desai has 11 years of experience as a urologist. He is an expert in treating urinary tract infections, bladder issues, and prostate health. He provides compassionate and effective care.",
    image: "https://placehold.co/120x120/3d5afe/ffffff?text=A.D.",
    symptoms: ["urinary infection", "prostate enlargement", "bladder control issues"],
    rating: 4.6,
    experience: "11 Years",
    fees: { min: 1000, max: 3500 }
  },
  {
    id: 42,
    name: "Dr. Fatima Khan",
    specialty: "ENT Specialist",
    location: "Mumbai",
    bio: "A highly-skilled ENT specialist with 13 years of experience, Dr. Khan treats conditions related to the ear, nose, and throat, including allergies, sinus issues, and tonsillitis.",
    image: "https://placehold.co/120x120/f44336/ffffff?text=F.K.",
    symptoms: ["sinusitis", "tonsillitis", "allergies", "nasal congestion"],
    rating: 4.7,
    experience: "13 Years",
    fees: { min: 850, max: 2800 }
  },
  {
    id: 43,
    name: "Dr. Pankaj Mehta",
    specialty: "General Physician",
    location: "Chennai",
    bio: "Dr. Mehta is a trusted General Physician with 20 years of experience. He is a family doctor who provides long-term health management and preventive care for all his patients.",
    image: "https://placehold.co/120x120/ab47bc/ffffff?text=P.M.",
    symptoms: ["fever", "cold", "diabetes", "hypertension", "thyroid"],
    rating: 4.8,
    experience: "20 Years",
    fees: { min: 700, max: 2000 }
  },
  {
    id: 44,
    name: "Dr. Neerja Rao",
    specialty: "Dermatologist",
    location: "New Delhi",
    bio: "Dr. Rao is a dermatologist with 15 years of experience, specializing in complex skin conditions, cosmetic procedures, and laser treatments. She is an expert in skin rejuvenation.",
    image: "https://placehold.co/120x120/2196f3/ffffff?text=N.R.",
    symptoms: ["acne", "psoriasis", "eczema", "laser hair removal", "botox"],
    rating: 4.9,
    experience: "15 Years",
    fees: { min: 1200, max: 5000 }
  },
  {
    id: 45,
    name: "Dr. Suresh Kumar",
    specialty: "Cardiologist",
    location: "Hyderabad",
    bio: "An interventional cardiologist with 25 years of experience, Dr. Kumar is a pioneer in his field. He has performed thousands of successful procedures and is a trusted name in heart care.",
    image: "https://placehold.co/120x120/00bcd4/ffffff?text=S.K.",
    symptoms: ["heart attack", "stenting", "bypass surgery", "heart valve issues"],
    rating: 5.0,
    experience: "25 Years",
    fees: { min: 2500, max: 15000 }
  },
  {
    id: 46,
    name: "Dr. Kavya Reddy",
    specialty: "Pediatrician",
    location: "Mumbai",
    bio: "Dr. Reddy is a caring pediatrician with 9 years of experience, providing expert care for children of all ages. She focuses on early intervention and preventive care.",
    image: "https://placehold.co/120x120/4caf50/ffffff?text=K.R.",
    symptoms: ["childhood illnesses", "vaccination", "developmental delay", "allergies"],
    rating: 4.7,
    experience: "9 Years",
    fees: { min: 650, max: 1700 }
  },
  {
    id: 47,
    name: "Dr. Rohan Patel",
    specialty: "Orthopedic Surgeon",
    location: "New Delhi",
    bio: "With 18 years of experience, Dr. Patel is an expert orthopedic surgeon specializing in knee and hip replacement. He uses the latest surgical techniques for better patient outcomes.",
    image: "https://placehold.co/120x120/ffc107/ffffff?text=R.P.",
    symptoms: ["knee replacement", "hip replacement", "arthritis", "joint pain"],
    rating: 4.9,
    experience: "18 Years",
    fees: { min: 2000, max: 8000 }
  },
  {
    id: 48,
    name: "Dr. Shilpa Ghosh",
    specialty: "Neurologist",
    location: "Bengaluru",
    bio: "Dr. Ghosh is a neurologist with 10 years of experience, focusing on neurological pain management, epilepsy, and migraines. She is known for her compassionate and detailed approach.",
    image: "https://placehold.co/120x120/ff5722/ffffff?text=S.G.",
    symptoms: ["migraine", "epilepsy", "nerve pain", "tingling", "headache"],
    rating: 4.8,
    experience: "10 Years",
    fees: { min: 1300, max: 4500 }
  },
  {
    id: 49,
    name: "Dr. Manish Kumar",
    specialty: "General Surgeon",
    location: "Mumbai",
    bio: "A general surgeon with 16 years of experience, Dr. Kumar performs a wide range of surgeries including laparoscopic procedures, hernia repairs, and appendectomies.",
    image: "https://placehold.co/120x120/9e9e9e/ffffff?text=M.K.",
    symptoms: ["hernia", "appendicitis", "gallbladder stones", "laparoscopic surgery"],
    rating: 4.7,
    experience: "16 Years",
    fees: { min: 1000, max: 10000 }
  },
  {
    id: 50,
    name: "Dr. Aarti Singh",
    specialty: "Endocrinologist",
    location: "New Delhi",
    bio: "Dr. Singh is a respected endocrinologist with 12 years of experience. She specializes in managing complex cases of diabetes, thyroid disorders, and pituitary gland issues.",
    image: "https://placehold.co/120x120/673ab7/ffffff?text=A.S.",
    symptoms: ["diabetes type 1", "thyroid cancer", "pituitary disorders", "PCOD"],
    rating: 4.8,
    experience: "12 Years",
    fees: { min: 1500, max: 5000 }
  },
  {
    id: 51,
    name: "Dr. Vivek Tiwari",
    specialty: "Gastroenterologist",
    location: "Mumbai",
    bio: "A gastroenterologist with 18 years of experience, Dr. Tiwari is an expert in treating conditions of the stomach, intestines, and liver. He is known for his advanced endoscopic skills.",
    image: "https://placehold.co/120x120/795548/ffffff?text=V.T.",
    symptoms: ["ulcerative colitis", "crohn's disease", "gastritis", "jaundice"],
    rating: 4.9,
    experience: "18 Years",
    fees: { min: 1600, max: 5000 }
  },
  {
    id: 52,
    name: "Dr. Kavita Singh",
    specialty: "Psychiatrist",
    location: "Bengaluru",
    bio: "Dr. Singh is a compassionate psychiatrist with 9 years of experience, specializing in counseling, therapy, and pharmacological treatment for mental health disorders.",
    image: "https://placehold.co/120x120/e91e63/ffffff?text=K.S.",
    symptoms: ["PTSD", "bipolar disorder", "schizophrenia", "addiction", "anxiety"],
    rating: 4.8,
    experience: "9 Years",
    fees: { min: 1200, max: 4000 }
  },
  {
    id: 53,
    name: "Dr. Rohit Gupta",
    specialty: "General Physician",
    location: "Hyderabad",
    bio: "Dr. Gupta is a friendly family doctor with 7 years of experience. He provides general medical consultations, health check-ups, and manages common ailments for all age groups.",
    image: "https://placehold.co/120x120/009688/ffffff?text=R.G.",
    symptoms: ["cold", "flu", "sore throat", "fever", "digestive issues"],
    rating: 4.6,
    experience: "7 Years",
    fees: { min: 400, max: 1200 }
  },
  {
    id: 54,
    name: "Dr. Shruti Nair",
    specialty: "Ophthalmologist",
    location: "Pune",
    bio: "An ophthalmologist with 16 years of experience, Dr. Nair is an expert in treating eye infections, vision problems, and performing routine eye exams. She is known for her meticulous approach.",
    image: "https://placehold.co/120x120/ff9800/ffffff?text=S.N.",
    symptoms: ["conjunctivitis", "dry eyes", "vision testing", "spectacle prescription"],
    rating: 4.7,
    experience: "16 Years",
    fees: { min: 600, max: 1800 }
  },
  {
    id: 55,
    name: "Dr. Arjun Sharma",
    specialty: "Dentist",
    location: "New Delhi",
    bio: "Dr. Sharma is a modern dentist with 6 years of experience, offering general and cosmetic dentistry. He focuses on patient comfort and uses advanced techniques for optimal results.",
    image: "https://placehold.co/120x120/7cb342/ffffff?text=A.S.",
    symptoms: ["dental cleaning", "fillings", "crowns", "veneers", "bad breath"],
    rating: 4.5,
    experience: "6 Years",
    fees: { min: 450, max: 1500 }
  },
  {
    id: 56,
    name: "Dr. Pooja Singh",
    specialty: "Physiotherapist",
    location: "Mumbai",
    bio: "A highly-rated physiotherapist with 10 years of experience, Dr. Singh specializes in sports injury rehabilitation and post-surgical recovery. She creates tailored programs for each patient.",
    image: "https://placehold.co/120x120/dce775/ffffff?text=P.S.",
    symptoms: ["knee injury", "shoulder pain", "post-op rehab", "mobility issues"],
    rating: 4.9,
    experience: "10 Years",
    fees: { min: 500, max: 1800 }
  },
  {
    id: 57,
    name: "Dr. Sanjeev Gupta",
    specialty: "Pulmonologist",
    location: "Bengaluru",
    bio: "Dr. Gupta is a pulmonologist with 19 years of experience, providing expert care for respiratory diseases like asthma, bronchitis, and pneumonia. He is dedicated to improving lung health.",
    image: "https://placehold.co/120x120/8d6e63/ffffff?text=S.G.",
    symptoms: ["asthma attack", "chronic cough", "bronchitis", "sleep apnea"],
    rating: 4.8,
    experience: "19 Years",
    fees: { min: 1100, max: 3900 }
  },
  {
    id: 58,
    name: "Dr. Smita Rao",
    specialty: "Dietitian & Nutritionist",
    location: "Chennai",
    bio: "A nutritionist with 7 years of experience, Dr. Rao helps patients achieve their health goals through balanced diet plans, focusing on sustainable and healthy eating habits.",
    image: "https://placehold.co/120x120/b0bec5/ffffff?text=S.R.",
    symptoms: ["healthy eating", "weight gain", "cholesterol management", "sports nutrition"],
    rating: 4.7,
    experience: "7 Years",
    fees: { min: 550, max: 1700 }
  },
  {
    id: 59,
    name: "Dr. Vikram Das",
    specialty: "Nephrologist",
    location: "New Delhi",
    bio: "Dr. Das is a nephrologist with 15 years of experience, specializing in kidney care, dialysis, and kidney transplants. He offers comprehensive and compassionate treatment.",
    image: "https://placehold.co/120x120/4db6ac/ffffff?text=V.D.",
    symptoms: ["kidney failure", "dialysis", "kidney transplant evaluation", "fluid retention"],
    rating: 4.8,
    experience: "15 Years",
    fees: { min: 1400, max: 4800 }
  },
  {
    id: 60,
    name: "Dr. Ananya Sharma",
    specialty: "Rheumatologist",
    location: "Mumbai",
    bio: "A rheumatologist with 13 years of experience, Dr. Sharma treats inflammatory diseases affecting joints, muscles, and bones. She provides personalized treatment plans for chronic conditions.",
    image: "https://placehold.co/120x120/f06292/ffffff?text=A.S.",
    symptoms: ["autoimmune disease", "psoriatic arthritis", "ankylosing spondylitis", "fibromyalgia"],
    rating: 4.7,
    experience: "13 Years",
    fees: { min: 1000, max: 3500 }
  }
];

const expertiseList = [
  { icon: 'fa-user-md', name: 'General Physician', search: 'general physician' },
  { icon: 'fa-brain', name: 'Neurologist', search: 'neurologist' },
  { icon: 'fa-heartbeat', name: 'Cardiologist', search: 'cardiologist' },
  { icon: 'fa-bone', name: 'Orthopedic Surgeon', search: 'orthopedic surgeon' },
  { icon: 'fa-baby', name: 'Pediatrician', search: 'pediatrician' },
  { icon: 'fa-cut', name: 'Surgeon', search: 'surgeon' },
  { icon: 'fa-lungs', name: 'Pulmonologist', search: 'pulmonologist' },
  { icon: 'fa-eye', name: 'Ophthalmologist', search: 'ophthalmologist' },
  { icon: 'fa-tooth', name: 'Dentist', search: 'dentist' },
  { icon: 'fa-notes-medical', name: 'Gynecologist', search: 'gynecologist' },
  { icon: 'fa-skin', name: 'Dermatologist', search: 'dermatologist' },
  { icon: 'fa-stomach', name: 'Gastroenterologist', search: 'gastroenterologist' },
  { icon: 'fa-child', name: 'Psychiatrist', search: 'psychiatrist' },
  { icon: 'fa-x-ray', name: 'Radiologist', search: 'radiologist' },
  { icon: 'fa-ear-listen', name: 'ENT Specialist', search: 'ent specialist' },
  { icon: 'fa-flask', name: 'Endocrinologist', search: 'endocrinologist' },
  { icon: 'fa-ribbon', name: 'Oncologist', search: 'oncologist' },
  { icon: 'fa-kidneys', name: 'Nephrologist', search: 'nephrologist' },
  { icon: 'fa-joint', name: 'Rheumatologist', search: 'rheumatologist' },
  { icon: 'fa-running', name: 'Physiotherapist', search: 'physiotherapist' },
  { icon: 'fa-apple-alt', name: 'Dietitian', search: 'dietitian' },
  { icon: 'fa-hand-sparkles', name: 'Plastic Surgeon', search: 'plastic surgeon' },
  { icon: 'fa-urology', name: 'Urologist', search: 'urologist' },
  { icon: 'fa-surgical-mask', name: 'General Surgeon', search: 'general surgeon' },
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
      const isFilled = i < Math.floor(doctor.rating);
      const isHalf = i === Math.floor(doctor.rating) && doctor.rating % 1 !== 0;
      return `<i class="fas fa-star ${isFilled ? 'filled' : ''} ${isHalf ? 'fa-star-half-alt' : ''}"></i>`;
    }).join('');

    doctorCard.innerHTML = `
      <img src="${doctor.image}" alt="Dr. ${doctor.name}" class="doctor-avatar">
      <h3>Dr. ${doctor.name}</h3>
      <p class="specialty">${doctor.specialty}</p>
      <div class="rating">
        ${stars} <span>(${doctor.rating})</span>
      </div>
      <p class="location"><i class="fas fa-map-marker-alt"></i> ${doctor.location}</p>
      <p class="experience"><i class="fas fa-briefcase"></i> Experience: ${doctor.experience}</p>
      <p class="fees"><i class="fas fa-rupee-sign"></i> Fees: ₹${doctor.fees.min} - ₹${doctor.fees.max}</p>
      <p class="bio">${doctor.bio}</p>
      <button class="btn-primary">View Profile & Book</button>
    `;
    doctorResultsGrid.appendChild(doctorCard);
  });
};

const displayExpertiseOptions = () => {
  const expertiseOptionsContainer = document.getElementById('expertiseOptions');
  if (!expertiseOptionsContainer) return;

  expertiseList.forEach(option => {
    const optionCard = document.createElement('div');
    optionCard.classList.add('option-card');
    optionCard.innerHTML = `<i class="fas ${option.icon}"></i> ${option.name}`;
    optionCard.addEventListener('click', () => {
      document.getElementById('symptomsInput').value = option.search;
      performSearch();
    });
    expertiseOptionsContainer.appendChild(optionCard);
  });
};

const performSearch = () => {
  const symptomsInput = document.getElementById('symptomsInput');
  const locationInput = document.getElementById('locationInput');
  const minFeesInput = document.getElementById('minFeesInput');
  const maxFeesInput = document.getElementById('maxFeesInput');
  const minExperienceInput = document.getElementById('minExperienceInput');
  const maxExperienceInput = document.getElementById('maxExperienceInput');
  const doctorLoadingSpinner = document.getElementById('doctorLoadingSpinner');
  const doctorResultsGrid = document.getElementById('doctorResultsGrid');
  const initialSearchMessage = document.getElementById('initialSearchMessage');

  const symptomsQuery = symptomsInput.value.toLowerCase().trim();
  const locationQuery = locationInput.value.toLowerCase().trim();
  const minFees = minFeesInput.value ? parseInt(minFeesInput.value) : 0;
  const maxFees = maxFeesInput.value ? parseInt(maxFeesInput.value) : 50000;
  const minExperience = minExperienceInput.value ? parseInt(minExperienceInput.value) : 0;
  const maxExperience = maxExperienceInput.value ? parseInt(maxExperienceInput.value) : Infinity;

  // Clear existing results and show loading spinner
  if (doctorResultsGrid) doctorResultsGrid.innerHTML = '';
  if (initialSearchMessage) initialSearchMessage.style.display = 'none';
  if (doctorLoadingSpinner) doctorLoadingSpinner.style.display = 'block';

  setTimeout(() => { // Simulate API call delay
    if (doctorLoadingSpinner) doctorLoadingSpinner.style.display = 'none'; // Hide spinner

    let filteredDoctors = mockDoctors.filter(doctor => {
      // Get the numeric experience from the string, e.g., "15 Years" -> 15
      const doctorExperience = parseInt(doctor.experience.split(' ')[0]);

      const matchesSymptoms = symptomsQuery === '' ||
                              doctor.specialty.toLowerCase().includes(symptomsQuery) ||
                              doctor.symptoms.some(symptom => symptom.includes(symptomsQuery));

      const matchesLocation = locationQuery === '' ||
                              doctor.location.toLowerCase().includes(locationQuery);
      
      const matchesFees = (doctor.fees.min <= maxFees && doctor.fees.max >= minFees);

      const matchesExperience = (doctorExperience >= minExperience && doctorExperience <= maxExperience);

      return matchesSymptoms && matchesLocation && matchesFees && matchesExperience;
    });

    displayDoctors(filteredDoctors);
  }, 1500); // 1.5 second delay
};

// This function now initializes the page when the script is loaded
function initializeFindDoctorsPage() {
  const searchDoctorsBtn = document.getElementById('searchDoctorsBtn');

  // Check if elements exist before attaching listeners
  if (searchDoctorsBtn && !searchDoctorsBtn.dataset.listenerAttached) {
    searchDoctorsBtn.addEventListener('click', performSearch);
    searchDoctorsBtn.dataset.listenerAttached = 'true'; // Mark listener as attached
  }

  displayExpertiseOptions();
  // Optionally display all doctors on initial load of the standalone page
  // displayDoctors(mockDoctors);
}

// Call the initialization function when the DOM is fully loaded for standalone use
document.addEventListener('DOMContentLoaded', initializeFindDoctorsPage);
