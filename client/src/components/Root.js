const React = require('react')
const {QueryRenderer, graphql} = require('react-relay')
const App = require('./App')
const {environment} = require('../relay/environment')

const Root = () => {
  const query = graphql`
    query RootQuery { viewer { ...App_viewer } }
  `
  const render = ({error, props}) => {
    if (error || !props) return null
    const app = <App viewer={props.viewer} />
    window.app = app
    return app
  }
  return <QueryRenderer environment={environment} query={query} render={render} />
}

module.exports = Root
