import { useEffect } from "react";

const GlobalTranslateGooogle = ({ targetLang }) => {
  useEffect(() => {
    // Load the Google Translate script
    const scriptId = "google-translate-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
    }

    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", autoDisplay: false },
        "google_translate_element"
      );

      const select = document.querySelector(".goog-te-combo");

      if (select) {
        // Use localStorage if available, else fallback to targetLang
        const savedLang = localStorage.getItem("selectedLanguage") || targetLang;
        select.value = savedLang;
        select.dispatchEvent(new Event("change"));

        // Save any new changes to localStorage
        select.addEventListener("change", (e) => {
          localStorage.setItem("selectedLanguage", e.target.value);
        });
      }
    };
  }, [targetLang]);

  return <div id="google_translate_element"></div>;
};

export default GlobalTranslateGooogle;
