// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// English translations
const resources = {
  en: {
    translation: {
      heading: 'Alertmanager Template Playground',
      codeEditor: {
        reset: {
          title: 'Reset to default value'
        },
        toggleFullscreen: {
          title: 'Toggle fullscreen'
        }
      },
      template: {
        title: 'Template'
      },
      contextdata: {
        title: 'Context Data'
      },
      preview: {
        title: 'Preview'
      }
    }
  },
  de: {
    translation: {
      heading: 'Alertmanager Template Playground',
      codeEditor: {
        reset: {
          title: 'Auf Standardwert zurücksetzen'
        },
        toggleFullscreen: {
          title: 'Vollbildmodus umschalten'
        }
      },
      template: {
        title: 'Vorlage'
      },
      contextdata: {
        title: 'Kontextdaten'
      },
      preview: {
        title: 'Vorschau'
      }
    }
  }
  // Add more languages here
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
