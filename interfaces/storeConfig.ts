export interface Currency {
  code: string
  symbol: string
}

export interface StoreConfig {
  copyright: string
  category_suffix: string
  locale: string
  logo_alt: string
  logo_height: string
  logo_width: string
  cms_home: string
  shortcut_icon: string
  product_suffix: string
  logo_src: string
  base_url: string
  base_media_url: string
}

export interface StoreConfigQuery {
  currency: Currency
  storeConfig: StoreConfig
}
