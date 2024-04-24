import Link from 'next/link'
import { useTranslations } from 'next-intl'

const MiniCart = () => {
  const t = useTranslations('Minicart')

  return (
    <div>
      <p>{t('qty', { qty: 2 })}</p>
      <div>
        {t.rich('message', {
          partner: (chunks: any) => <Link href={t('partnerHref')}>{chunks}</Link>
        })}
      </div>
    </div>
  )
}

export default MiniCart
