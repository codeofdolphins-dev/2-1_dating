// src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      welcome: "Welcome",
      account: "Account",
      subscription: "Subscription",
      submit: "Submit"
    }
  },
  nl: {
    translation: {
      welcome: "Welkom",
      account: "Account",
      subscription: "Abonnement",
      submit: "Verzenden"
    }
  },
  de: {
    translation: {
      welcome: "Willkommen",
      account: "Konto",
      subscription: "Abonnement",
      submit: "Einreichen"
    }
  },
  fr: {
    translation: {
      welcome: "Bienvenue",
      account: "Compte",
      subscription: "Abonnement",
      submit: "Soumettre"
    }
  },
  es: {
    translation: {
      welcome: "Bienvenido",
      account: "Cuenta",
      subscription: "Suscripción",
      submit: "Enviar"
    }
  },
  it: {
    translation: {
      welcome: "Benvenuto",
      account: "Account",
      subscription: "Abbonamento",
      submit: "Invia"
    }
  },
  pt: {
    translation: {
      welcome: "Bem-vindo",
      account: "Conta",
      subscription: "Assinatura",
      submit: "Enviar"
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
