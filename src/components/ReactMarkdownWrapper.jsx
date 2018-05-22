import React from 'react'
import ReactMarkdown from 'react-markdown'

export const reactMarkdownRendererOptions = {
  Link: props => (
    <a href={props.href} target="_blank">
      {props.children}
    </a>
  )
}

reactMarkdownRendererOptions.Link.displayName = 'Link'

export const ReactMarkdownWrapper = ({ source }) => (
  <ReactMarkdown source={source} renderers={reactMarkdownRendererOptions} />
)

ReactMarkdownWrapper.displayName = 'ReactMarkdownWrapper'

export default ReactMarkdownWrapper
