export type GoogleTagManager = {
  id: string
}

export const GoogleTagManagerNoScript: React.FC<GoogleTagManager> = ({ id }) => {
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${id}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  )
}
