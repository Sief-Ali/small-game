import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import ar from './locales/ar.json'

const LANGUAGE_KEY = 'choose-your-chaos-language'

function getInitialLanguage(): 'en' | 'ar' {
  try {
    return localStorage.getItem(LANGUAGE_KEY) === 'ar' ? 'ar' : 'en'
  } catch {
    return 'en'
  }
}

function applyDocumentLanguage(language: string) {
  if (typeof document === 'undefined') return

  const locale = language.toLowerCase().startsWith('ar') ? 'ar' : 'en'
  document.documentElement.lang = locale
  document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr'

  try {
    localStorage.setItem(LANGUAGE_KEY, locale)
  } catch {
    // Language still changes for the current session when storage is unavailable.
  }
}

void i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ar: { translation: ar }
    },
    lng: getInitialLanguage(),
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    returnNull: false,
    react: { useSuspense: false }
  })

i18next.on('languageChanged', applyDocumentLanguage)
applyDocumentLanguage(i18next.language || 'en')

export default i18next
