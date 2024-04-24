import CmsBlock from '@/components/CmsBlock'
import Newsletter from './Newsletter'

const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col items-center justify-between">
        <CmsBlock />
        <div className="flex w-full justify-center">
          <Newsletter />
        </div>
      </div>
    </footer>
  )
}

export default Footer
