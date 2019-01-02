import React, { Component } from 'react'
import ProjectList from '../projects/ProjectList'
import Notifications from './Notifications'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import { Redirect } from 'react-router-dom';

class Dashboard extends Component {
  render() {
    const { auth, projects, notifications } = this.props;
    if(auth) {
      return (
        <div className="dashboard container">
          <div className="row">
            <div className="col s12 m6">
              <ProjectList projects={projects} />
            </div>
            <div className="col s12 m5 offset-m1">
              <Notifications notifs={notifications} />
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <Redirect to="/signin"/>
      )
    }
  }
}

const mapStateToProps = (state) => {
  console.log(state)
  return {
    projects: state.firestore.ordered.projects,
    auth: state.firebase.auth.uid,
    notifications : state.firestore.ordered.notifications
  }
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'projects', orderBy : ['createdAt', 'desc'] },
    { collection : 'notifications', orderBy : ['time', 'desc'] }
  ])
)(Dashboard)
