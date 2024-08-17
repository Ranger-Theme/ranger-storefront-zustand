import { useTranslations } from 'next-intl'

const CartPage = () => {
  const t = useTranslations('Orders')

  return (
    <div>
      <p>
        {t(
          'ordered',
          { orderDate: new Date('2020-11-20T10:36:01.516Z') },
          {
            dateTime: {
              short: {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              }
            }
          }
        )}
      </p>
    </div>
  )
}

export default CartPage
