import Head from 'next/head'
import { memo } from 'react'
import type { FC } from 'react'

import type { CmsPage } from '@/interfaces'

const HomePage: FC<CmsPage> = ({ ...props }) => {
  return (
    <>
      <Head>
        <meta name="title" content={props.meta_title || props.title} />
        <meta name="keywords" content={props.meta_keywords || props.title} />
        <meta name="description" content={props.meta_description || props.title} />
        <title>{props.title}</title>
      </Head>
      <h1>{props.title}</h1>
      <div className="fixed left-0 top-0 flex w-full justify-center">
        <div dangerouslySetInnerHTML={{ __html: props.content }} />
      </div>
    </>
  )
}

export default memo(HomePage)
