import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
// Using "moment" to format the date
const ProjectSummary = (props) => {
  const { project, profileInfo } = props;
    return (
      <div className="card z-depth-0 project-summary">
        <div className="card-content grey-text text-darken-3">
          <span className="card-title ">{project.title}</span>
          <p>Posted by { profileInfo.firstName } { profileInfo.lastName }</p>
          <p className="grey-text">{moment(project.createdAt.toDate()).calendar()}</p>
        </div>
      </div>
    )
}

const mapStateToProps = (state) => {
  return {
    profileInfo : state.firebase.profile
  }
}

export default connect(mapStateToProps)(ProjectSummary)
