import React from 'react'

export const MainView = ({ children }) => (
  <main
    className="main-view u-flex u-flex-column u-flex-content-start u-flex-content-stretch u-w-100 u-pos-relative"
    style={{ minHeight: '100vh' }}
  >
    {children}
  </main>
)
