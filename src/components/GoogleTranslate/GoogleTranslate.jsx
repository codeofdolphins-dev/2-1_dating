import { useEffect } from "react";

const GoogleTranslate = ({ targetLang }) => {
  useEffect(() => {
    // Remove old widget content if exists
    const oldWidget = document.getElementById("google_translate_element");
    if (oldWidget) oldWidget.innerHTML = "";

    // Function to set language in the widget
    const setLanguage = () => {
      const select = document.querySelector("#google_translate_element select");
      if (select) {
        select.value = targetLang || "en";
        select.dispatchEvent(new Event("change"));
      } else {
        // Retry after 200ms if select not yet available
        setTimeout(setLanguage, 200);
      }

      console.log("sadasdasd",select)
    };

    // Initialize Google Translate widget
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: false,
        },
        "google_translate_element"
      );

      if (targetLang && targetLang !== "en") {
        setLanguage();
      }
    };

    // Load script if not already loaded
    if (!window.google || !window.google.translate) {
      const script = document.createElement("script");
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    } else {
      // Script already loaded, just initialize
      window.googleTranslateElementInit();
    }
  }, [targetLang]);

  return <div id="google_translate_element"></div>;
};

export default GoogleTranslate;
