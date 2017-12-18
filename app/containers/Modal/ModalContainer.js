// import React from 'react'
import { Modal } from 'components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as modalActionCreators from 'redux/modules/modal'
import * as duckActionCreators from 'redux/modules/ducks'

/*
* Removed react container component since there is no need for it.
* WHY? => This container component has no lifecycle event or state so there really is no need
* to create the container component.
* INSTEAD we can pass the props directly to the Modal component

class ModalContainer extends React.Component {
  render () {
    return (
      <Modal />
    )
  }
}
 */

function mapStateToProps ({ modal, users }) {
  const duckTextLength = modal.get('duckText').length
  const userId = users.get('authedId') || Map()

  return {
    user: users.get(userId) ? users.getIn([userId, 'info']) : Map(), // users[users.authedId] ? users[users.authedId].info : {},
    duckText: modal.get('duckText'),
    isOpen: modal.get('isOpen'),
    isSubmitDisabled: duckTextLength <= 0 || duckTextLength > 140
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({...modalActionCreators, ...duckActionCreators}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Modal)
