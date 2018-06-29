import { Component } from 'react'

// a component to automatically reset the scroll
// on mount (see https://reacttraining.com/react-router/web/guides/scroll-restoration/scroll-to-top)
export class ScrollToTopOnMount extends Component {
  componentDidMount() {
    const target = this.props && this.props.target
    target && typeof target.scrollTo === 'function' && target.scrollTo(0, 0)
  }

  render() {
    return null
  }
}

export default ScrollToTopOnMount
