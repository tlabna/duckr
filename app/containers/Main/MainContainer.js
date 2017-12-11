import React from 'react'
import PropTypes from 'prop-types'
import { Navigation } from 'components'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { container, innerContainer } from './styles.css'

class MainContainer extends React.Component {
  render () {
    console.log('PROPS', this.props)
    return (
      <div className={container}>
        <Navigation isAuthed={this.props.isAuthed} />
        <div className={innerContainer}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

MainContainer.propTypes = {
  children: PropTypes.any.isRequired,
  isAuthed: PropTypes.bool.isRequired
}

function mapStateToProps (state) {
  return {
    isAuthed: state.isAuthed
  }
}

export default withRouter(connect(mapStateToProps)(MainContainer))
