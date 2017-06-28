import React from 'react'
import ReactMarkdown from 'react-markdown'

export const reactMarkdownRendererOptions = {
  Link: props => <a href={props.href} target='_blank'>{props.children}</a>
}

export const ReactMarkdownWrapper = ({ source }) =>
  <ReactMarkdown
    source={source}
    renderers={reactMarkdownRendererOptions}
  />

export default ReactMarkdownWrapper
