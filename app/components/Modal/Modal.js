import React from 'react'
import PropTypes from 'prop-types'
import { default as ReactModal } from 'react-modal' // Calling ReactModal since package uses name Modal as well
import { newDuckTop, pointer, newDuckInputContainer,
  newDuckInput, submitDuckBtn, darkBtn } from './styles.css'
import { formatDuck } from 'helpers/utils'
import ImmutablePropTypes from 'react-immutable-proptypes'

// Need to properly hide the application from screenreaders and other
// assistive technologies while the modal is open
ReactModal.setAppElement('#app')

// ReactModal says to modify styles by modifying content
const modalStyles = {
  content: {
    width: 350,
    margin: '0px auto',
    height: 220,
    borderRadius: 5,
    background: '#EBEBEB',
    padding: 0
  }
}

Modal.propTypes = {
  duckText: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  user: ImmutablePropTypes.map.isRequired,
  isSubmitDisabled: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  updateDuckText: PropTypes.func.isRequired,
  duckFanout: PropTypes.func.isRequired
}

export default function Modal (props) {
  function submitDuck () {
    props.duckFanout(formatDuck(props.duckText, props.user))
  }

  return (
    <span className={darkBtn} onClick={props.openModal}>
      {'Duck'}
      <ReactModal
        style={modalStyles}
        isOpen={props.isOpen}
        onRequestClose={props.closeModal}
        contentLabel={'Modal'}>
        <div className={newDuckTop}>
          <span>{'Compose new Duck'}</span>
          <span onClick={props.closeModal} className={pointer}>{'X'}</span>
        </div>
        <div className={newDuckInputContainer}>
          <textarea
            onChange={(e) => props.updateDuckText(e.target.value)}
            value={props.duckText}
            maxLength={140}
            type='text'
            className={newDuckInput}
            placeholder="What's on your mind?" />
        </div>
        <button
          className={submitDuckBtn}
          disabled={props.isSubmitDisabled}
          onClick={submitDuck}>
          {'Duck'}
        </button>
      </ReactModal>
    </span>
  )
}
