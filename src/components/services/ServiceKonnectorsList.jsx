import React from 'react'

import ServiceKonnector from './ServiceKonnector'

const ServiceKonnectorsList = ({ t, konnectorsList, showKonnector }) => (
  <ul className="connector-list">
    {konnectorsList.map(konnector => (
      <ServiceKonnector konnector={konnector} showKonnector={showKonnector} />
    ))}
  </ul>
)

export default ServiceKonnectorsList
