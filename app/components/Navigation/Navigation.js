import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { container, navContainer, link } from './styles.css'
import { ModalContainer } from 'containers'

Navigation.propTypes = ActionLinks.propTypes = NavLinks.propTypes = {
  isAuthed: PropTypes.bool.isRequired
}

function NavLinks ({isAuthed}) {
  return isAuthed === true
    ? <ul>
      <li><Link className={link} to='/'>{'Home'}</Link></li>
    </ul>
    : null
}

/*
  Note. We'll connect redux to ModalContainer rather than pass down props from root component
  WHY? So we don't create prop holes and avoid breaking code if there is any
  component restructuring in the future
 */
function ActionLinks ({isAuthed}) {
  return isAuthed === true
    ? <ul>
      <li><ModalContainer /></li>
      <li><Link className={link} to='/logout'>{'Logout'}</Link></li>
    </ul>
    : <ul>
      <li><Link className={link} to='/'>{'Home'}</Link></li>
      <li><Link className={link} to='/auth'>{'Authenticate'}</Link></li>
    </ul>
}

export default function Navigation ({isAuthed}) {
  return (
    <div className={container}>
      <nav className={navContainer}>
        <NavLinks isAuthed={isAuthed} />
        <ActionLinks isAuthed={isAuthed} />
      </nav>
    </div>
  )
}
