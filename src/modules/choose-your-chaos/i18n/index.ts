import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import ar from './locales/ar.json'
import arMeta from '../../../../stories/the-city-that-forgot-dawn/ar/meta.json'
import arChapter01 from '../../../../stories/the-city-that-forgot-dawn/ar/chapters/chapter-01.json'
import arChapter02 from '../../../../stories/the-city-that-forgot-dawn/ar/chapters/chapter-02.json'
import arChapter03 from '../../../../stories/the-city-that-forgot-dawn/ar/chapters/chapter-03.json'
import arChapter04 from '../../../../stories/the-city-that-forgot-dawn/ar/chapters/chapter-04.json'
import arChapter05 from '../../../../stories/the-city-that-forgot-dawn/ar/chapters/chapter-05.json'
import arChapter06 from '../../../../stories/the-city-that-forgot-dawn/ar/chapters/chapter-06.json'
import arChapter07 from '../../../../stories/the-city-that-forgot-dawn/ar/chapters/chapter-07.json'

const LANGUAGE_KEY = 'choose-your-chaos-language'

const arStory = {
  meta: arMeta,
  passages: {
    ...arChapter01,
    ...arChapter02,
    ...arChapter03,
    ...arChapter04,
    ...arChapter05,
    ...arChapter06,
    ...arChapter07
  }
}

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
      ar: { translation: { ...ar, story: arStory } }
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
