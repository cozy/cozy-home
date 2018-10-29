import React from 'react'
import ReactMarkdown from 'react-markdown'

export const reactMarkdownRendererOptions = {
  // eslint-disable-next-line react/display-name
  Link: props => (
    <a href={props.href} rel="noopener noreferrer" target="_blank">
      {props.children}
    </a>
  )
}

export const ReactMarkdownWrapper = ({ source }) => (
  <ReactMarkdown source={source} renderers={reactMarkdownRendererOptions} />
)

export default ReactMarkdownWrapper
