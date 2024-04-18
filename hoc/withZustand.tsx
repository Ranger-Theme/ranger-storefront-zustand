import { Component } from 'react'

import { initializeStore } from '@/lib/store'

export const withZustand = (App: any) => {
  return class AppWithRedux extends Component {
    public zustandStore: any

    static async getInitialProps(appContext: any) {
      // Provide the store to getInitialProps of pages
      appContext.ctx.zustandStore = initializeStore()

      let appProps = {}

      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(appContext)
      }

      return {
        ...appProps,
        zustandStore: initializeStore()
      }
    }

    constructor(props: any) {
      super(props)
      this.zustandStore = initializeStore()
    }

    render() {
      return <App zustandStore={this.zustandStore} {...this.props} />
    }
  }
}
