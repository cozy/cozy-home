import React from 'react'
import ReactMarkdown from 'react-markdown'

const reactMarkdownRendererOptions = {
  Link: props => <a href={props.href} target='_blank'>{props.children}</a>
}

const ReactMarkdownWrapper = ({ source }) =>
  <ReactMarkdown
    source={source}
    renderers={reactMarkdownRendererOptions}
  />

export default ReactMarkdownWrapper
