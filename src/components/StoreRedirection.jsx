import React from 'react'
import Intents from 'cozy-interapp'

import Spinner from 'cozy-ui/transpiled/react/Spinner'
import { useClient } from 'cozy-client'

const StoreRedirection = props => {
  const client = useClient()
  const intents = new Intents({ client })
  const category = props.match && props.match.params.category
  const options = { type: 'konnector' }
  if (category && category !== 'all') {
    options.category = props.match.params.category
  }
  intents.redirect('io.cozy.apps', options)

  return <Spinner size="xxlarge" middle />
}

export default StoreRedirection
