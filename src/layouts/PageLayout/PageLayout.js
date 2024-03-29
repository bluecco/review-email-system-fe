import React from 'react'
import { IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'
import './PageLayout.scss'

export const PageLayout = ({ children }) => (

  <div className='container text-center'>
    <nav className="nav justify-content-center">
      <a className="nav-link" href="/reviews">Reviews</a>
      <a className="nav-link" href="/admin">Admin</a>
    </nav>
    <div className='page-layout__viewport'>
      {children}
    </div>
  </div>
)
PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout
