import React, { Component } from 'react'

/**
 * Higher Order Component that wraps functional components into stateful components.
 * Defining a stateful component becomes a matter of setting its initial state
 * and writing a handful of reducers on that state. The state and the reducers will
 * be passed as props to the wrapped functional component.
 * Example:
 * const ToggleButton = statefulComponent(initialState = {
 *   on: false
 * }, eventHandlers = setState => ({
 *   toggle: () => {
 *     setState(state => ({ on: !state.on })
 *   }
 * }))(
 *   ({ on, toggle }) => (
 *     <button className={on ? 'on' : 'off'} onClick={toggle}>Go!</button>
 *   )
 * )
 */
const statefulComponent = (initialState, eventHandlers) => {
  return WrappedComponent => {
    return class StatefulComponent extends Component {
      constructor(props) {
        super(props)
        this.handlers = eventHandlers(this.setState.bind(this))
      }

      componentDidMount() {
        this.setState(initialState)
      }

      render() {
        return (
          <WrappedComponent
            {...this.props}
            {...this.state}
            {...this.handlers}
          />
        )
      }
    }
  }
}

export default statefulComponent
