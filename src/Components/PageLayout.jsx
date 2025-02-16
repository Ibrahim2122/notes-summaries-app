import React from 'react'
import './PageLayout.css'

function PageLayout(props) {
  return (
      <div className='main-page-container'>
          <div className="main-pagh-content">
              {props.children}
          </div>
      </div>
  )
}

export default PageLayout