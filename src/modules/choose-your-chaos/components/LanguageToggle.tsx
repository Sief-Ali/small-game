import { Languages } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function LanguageToggle() {
  const { t, i18n } = useTranslation()
  const isArabic = i18n.resolvedLanguage === 'ar' || i18n.language.startsWith('ar')

  function toggleLanguage() {
    void i18n.changeLanguage(isArabic ? 'en' : 'ar')
  }

  return (
    <button
      className="language-toggle"
      type="button"
      onClick={toggleLanguage}
      aria-label={t('ui.languageLabel')}
      title={t('ui.languageLabel')}
    >
      <Languages size={16}/>
      <span>{isArabic ? t('ui.switchToEnglish') : t('ui.switchToArabic')}</span>
    </button>
  )
}
