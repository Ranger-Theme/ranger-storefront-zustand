import { useRouter } from 'next/router'
import { useTranslations } from 'next-intl'

const Header = () => {
  const router = useRouter()
  const t = useTranslations('Header')

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('locale', { locale: router.locale })}</p>
    </div>
  )
}

export default Header
