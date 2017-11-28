import React from 'react'
import PropTypes from 'prop-types'
import { Navigation } from 'components'
import { container, innerContainer } from './styles.css'

class MainContainer extends React.Component {
  render () {
    return (
      <div className={container}>
        <Navigation isAuthed={false} />
        <div className={innerContainer}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

MainContainer.propTypes = {
  children: PropTypes.any.isRequired
}

export default MainContainer
