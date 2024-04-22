import CmsBlock from '@/components/CmsBlock'
import Newsletter from './Newsletter'

const Footer = () => {
  return (
    <footer>
      <div className="flex min-h-screen flex-col items-center justify-between">
        <CmsBlock />
        <div className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          <Newsletter />
        </div>
      </div>
    </footer>
  )
}

export default Footer
