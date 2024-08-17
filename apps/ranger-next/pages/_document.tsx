import createCache from '@emotion/cache'
import {
  documentGetInitialProps,
  DocumentHeadTags,
  DocumentHeadTagsProps
} from '@mui/material-nextjs/v14-pagesRouter'
import type { DocumentContext, DocumentProps } from 'next/document'
import { Head, Html, Main, NextScript } from 'next/document'

const Document = ({ ...props }: DocumentProps & DocumentHeadTagsProps) => {
  return (
    <Html lang="en">
      <Head>
        <DocumentHeadTags {...props} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

Document.getInitialProps = async (ctx: DocumentContext) => {
  const finalProps = await documentGetInitialProps(ctx, {
    emotionCache: createCache({
      key: 'mui'
    })
  })
  return finalProps
}

export default Document
