import { gql } from 'graphql-request'

export const GET_STORE_CONFIG = gql`
  query getStoreConfig {
    storeConfig {
      copyright
      category_suffix: category_url_suffix
      locale
      logo_alt
      logo_height
      logo_width
      cms_home: cms_home_page
      shortcut_icon: head_shortcut_icon
      product_suffix: product_url_suffix
      logo_src: header_logo_src
      base_url: secure_base_url
      base_media_url: secure_base_media_url
    }
    currency {
      code: default_display_currency_code
      symbol: default_display_currency_symbol
    }
  }
`
