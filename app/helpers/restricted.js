import React from 'react'
import { withRouter } from 'react-router-dom'
import { checkIfAuthed } from './auth'

export default (BaseComponent, store) => {
  class Restricted extends React.Component {
    componentWillMount () {
      this.checkAuthentication(this.props)
    }

    componentWillReceiveProps (nextProps) {
      if (nextProps.location !== this.props.location) {
        this.checkAuthentication(nextProps)
      }
    }

    checkAuthentication (props) {
      if (store.getState().isFetching === true) {
        return
      }

      const { history } = props
      const nextPathName = history.location.pathname
      const isAuthed = checkIfAuthed(store)

      if (nextPathName === '/' || nextPathName === '/auth') {
        if (isAuthed === true) {
          history.replace({ pathname: '/feed' })
        }
      } else {
        if (isAuthed !== true) {
          history.replace({ pathname: '/auth' })
        }
      }
    }

    render () {
      return <BaseComponent {...this.props} />
    }
  }

  return withRouter(Restricted)
}
