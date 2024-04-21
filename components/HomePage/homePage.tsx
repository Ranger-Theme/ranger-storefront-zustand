import Head from 'next/head'
import { memo } from 'react'
import type { FC } from 'react'

import type { CmsPage } from '@/interfaces'

const HomePage: FC<CmsPage> = ({ ...props }) => {
  console.info('Homepage is render...')

  return (
    <>
      <Head>
        <meta name="title" content={props.meta_title || props.title} />
        <meta name="keywords" content={props.meta_keywords || props.title} />
        <meta name="description" content={props.meta_description || props.title} />
        <title>{props.title}</title>
      </Head>
      <h1>{props.title}</h1>
      <div className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        <div dangerouslySetInnerHTML={{ __html: props.content }} />
      </div>
    </>
  )
}

export default memo(HomePage)
