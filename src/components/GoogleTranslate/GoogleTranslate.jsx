import { useEffect } from "react";

const GoogleTranslate = ({lang}) => {

  const savedLang = localStorage.getItem("selectedLanguage") || "en";
  useEffect(() => {
    const initGoogleTranslate = () => {
      const oldWidget = document.getElementById("google_translate_element");
      if (oldWidget) oldWidget.innerHTML = "";

      const setLanguage = () => {
        const select = document.querySelector("#google_translate_element select");
        if (select) {
          const savedLang = localStorage.getItem("selectedLanguage") || "en";
          select.value = savedLang;
          select.dispatchEvent(new Event("change"));

          select.addEventListener("change", (e) => {
            localStorage.setItem("selectedLanguage", e.target.value);
          });
        } else {
          setTimeout(setLanguage, 200);
        }
      };

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          { pageLanguage: "en", autoDisplay: false },
          "google_translate_element"
        );
        setTimeout(setLanguage, 500);
      };

      // Remove old script if exists
      const oldScript = document.getElementById("google-translate-script");
      if (oldScript) oldScript.remove();

      // Add new script
      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    };

    initGoogleTranslate();
  }, [savedLang,lang]);

  return (
    <div
      id="google_translate_element"
      
    ></div>
  );
};

export default GoogleTranslate;
