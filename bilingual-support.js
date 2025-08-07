document.addEventListener('DOMContentLoaded', () => {
  const englishLangBtn = document.getElementById('englishLangBtn');
  const hindiLangBtn = document.getElementById('hindiLangBtn');
  const currentLanguageDisplay = document.getElementById('currentLanguage');
  const exampleTitle = document.getElementById('exampleTitle');
  const exampleDescription = document.getElementById('exampleDescription');

  // Define translations
  const translations = {
    en: {
      currentLanguage: "English",
      welcomeTitle: "Welcome to MyHealth Fusion!",
      welcomeDescription: "Your AI Health Assistant for a healthier life."
    },
    hi: {
      currentLanguage: "हिन्दी",
      welcomeTitle: "माईहेल्थ फ्यूजन में आपका स्वागत है!",
      welcomeDescription: "स्वस्थ जीवन के लिए आपका एआई स्वास्थ्य सहायक।"
    }
  };

  // Function to set language
  const setLanguage = (lang) => {
    // Update display
    currentLanguageDisplay.textContent = translations[lang].currentLanguage;
    exampleTitle.textContent = translations[lang].welcomeTitle;
    exampleDescription.textContent = translations[lang].welcomeDescription;

    // Update button styles
    if (lang === 'en') {
      englishLangBtn.classList.add('btn-primary');
      englishLangBtn.classList.remove('btn-secondary');
      hindiLangBtn.classList.add('btn-secondary');
      hindiLangBtn.classList.remove('btn-primary');
    } else {
      hindiLangBtn.classList.add('btn-primary');
      hindiLangBtn.classList.remove('btn-secondary');
      englishLangBtn.classList.add('btn-secondary');
      englishLangBtn.classList.remove('btn-primary');
    }

    // In a real application, you'd save this preference (e.g., localStorage)
    // and apply it to all dynamic content.
    console.log(`Language set to: ${lang}`);
  };

  // Event listeners for language buttons
  if (englishLangBtn) {
    englishLangBtn.addEventListener('click', () => setLanguage('en'));
  }

  if (hindiLangBtn) {
    hindiLangBtn.addEventListener('click', () => setLanguage('hi'));
  }

  // Set initial language (default to English)
  setLanguage('en');
});
