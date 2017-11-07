import React from 'react'

import { getKonnectorIcon } from '../../lib/icons'

const ServiceKonnectorsList = ({ konnectorsList, showKonnector }) => (
  <ul className="connector-list">
    {konnectorsList.map(konnector => (
      <li
        onKeyDown={e => (e.keyCode === 13 ? showKonnector(konnector) : null)}
        onClick={() => showKonnector(konnector)}
        tabIndex="0"
        className="item-wrapper"
      >
        <header className="item-header">
          <img className="item-icon" src={getKonnectorIcon(konnector)} />
        </header>
        <p className="item-title">{konnector.name}</p>
      </li>
    ))}
  </ul>
)

export default ServiceKonnectorsList
