import { useEffect } from "react";

const GoogleTranslate = ({ targetLang }) => {
  useEffect(() => {
    // Remove old widget if exists
    const oldWidget = document.getElementById("google_translate_element");
    if (oldWidget) oldWidget.innerHTML = "";

    // Add Google Translate script if not already present
    if (!window.google || !window.google.translate) {
      const script = document.createElement("script");
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: false,
        },
        "google_translate_element"
      );

      // Trigger language change after widget loads
      if (targetLang !== "en") {
        const select = document.querySelector(
          "#google_translate_element select"
        );
        if (select) {
          select.value = targetLang;
          select.dispatchEvent(new Event("change"));
        }
      }
    };

    // If script already loaded
    if (window.google && window.google.translate) {
      window.googleTranslateElementInit();
    }
  }, [targetLang]);

  return <div id="google_translate_element"></div>;
};

export default GoogleTranslate;
