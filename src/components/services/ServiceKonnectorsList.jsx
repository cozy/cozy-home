import React from 'react'

import ServiceKonnector from './ServiceKonnector'

const ServiceKonnectorsList = ({ konnectorsList, showKonnector }) => (
  <ul className="connector-list">
    {konnectorsList.map((konnector, i) => (
      <ServiceKonnector
        key={i}
        konnector={konnector}
        showKonnector={showKonnector}
      />
    ))}
  </ul>
)

export default ServiceKonnectorsList
