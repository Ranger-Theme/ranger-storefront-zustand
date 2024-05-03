import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Button } from '@mui/material'

import { useStore } from '@/providers'

const MiniCart = () => {
  const t = useTranslations('Minicart')
  const { cart, setCart } = useStore((state) => state)

  const handleOnCart = () => {
    setCart({
      id: 'Ph8KSD3kidpvTRxY07vjWruEfo5qHZRm',
      details: {
        items: [
          { id: 1, qty: 5 },
          { id: 2, qty: 6 }
        ]
      }
    })
  }

  return (
    <div className="flex justify-between align-middle">
      {cart?.cartId && <p>{cart.cartId}</p>}
      <p>{t('qty', { qty: 2 })}</p>
      <div className="flex-1">
        {t.rich('message', {
          partner: (chunks: any) => <Link href={t('partnerHref')}>{chunks}</Link>
        })}
      </div>
      <Button variant="contained" type="button" onClick={handleOnCart}>
        Save Cart
      </Button>
    </div>
  )
}

export default MiniCart
