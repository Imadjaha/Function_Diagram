const translations = {
    en: {
        translation: {
          "Homepage": "Homepage",
          "Setting": "Setting",
          "Enter a function (e.g., x^2 - e(x))": "Enter a function (e.g., x^2 - e(x))",
          "Add Function": "Add Function",
          "Export as PNG": "Export as PNG",
          "Export as SVG": "Export as SVG",
          "Delete All": "Delete All",
         "Language": "Language",
         "Background Color": "Background Color",
         "Automatic Backup": "Automatic Backup",
         "History of Plotted Functions": "History of Plotted Functions",
         "Enter a function (e.g., x^2 - e(x))": "Enter a function (e.g., x^2 - e(x))",
        }
      },
      gr: {
        translation: {
          "Homepage": "Startseite",
          "Setting": "Einstellung",
          "Enter a function (e.g., x^2 - e(x))": "Eine Funktion eingeben (z. B., x^2 - e(x))",
          "Add Function": "Funktion hinzufügen",
          "Export as PNG": "PNG exportieren",
          "Export as SVG": "SVG exportieren",
          "Delete All": "Alle löschen",
          "Language": "Sprache",
          "Background Color": "Hintergrundfarbe",
          "Automatic Backup": "Automatisches Backup",
          "History of Plotted Functions": "Verlauf der geplotteten Funktionen",
          "Enter a function (e.g., x^2 - e(x))": "Funktion eingeben (z.B., x^2 - e(x))",
          
        }
      }
    }

// Function to replace text content with translations
function translateContent(language) {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
      const key = element.getAttribute('data-translate');
      element.textContent = translations[language].translation[key];
    });
  }
  
  // Add event listener to the language selection dropdown
  document.getElementById('languageSelect').addEventListener('change', function() {
    const selectedLanguage = this.value;
    translateContent(selectedLanguage);
  });
