import { Component } from 'react'

export const withZustand = (App: any, initialState: any) => {
  return class AppWithRedux extends Component {
    public initialState: any

    static async getInitialProps(appContext: any) {
      // Provide the store to getInitialProps of pages
      appContext.ctx.initialState = initialState

      let appProps = {}

      if (typeof App.getInitialProps === 'function') {
        appProps = await App.getInitialProps(appContext)
      }

      return {
        ...appProps,
        initialState
      }
    }

    constructor(props: any) {
      super(props)
      this.initialState = initialState
    }

    render() {
      return <App initialState={this.initialState} {...this.props} />
    }
  }
}
