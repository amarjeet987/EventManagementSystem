import React from 'react'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import moment from 'moment';
import { deleteProject } from '../../store/actions/projectActions';

const ProjectDetails = (props) => {
  console.log(props);
  const taskDone = (e) => {
    e.preventDefault();
    props.deleteTask(props.project.id);
    props.history.push('/');
  }
  if(props.project == null) {
    return (
      <div className="container section project-details">
        <h5>Loading . . .</h5>
      </div>
    )
  } else {
    return (
      <div className="container section project-details">
        <div className="card z-depth-0">
          <div className="card-content">
            <span className="card-title">{props.project.title}</span>
            <p>{props.project.content}</p>
          </div>
          <div className="card-action grey lighten-4 grey-text">
            <div>Posted by {props.project.authorFirstName} {props.project.authorLastName}</div>
            <div>{moment(props.project.createdAt.toDate()).calendar()}</div>
            <form onSubmit={taskDone}>
              <button className="btn blue done-btn">Done</button>
            </form>
          </div>

        </div>
      </div>
    )
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTask : (task_id) => dispatch(deleteProject(task_id))
  }
}

const mapStateToProps = (state, ownprops) => {
  if(state.firestore.ordered.projects) {
    return {
      project: state.firestore.ordered.projects.find((project) => project.id === ownprops.match.params.id)
    }
  } else {
    return {
      project: null
    }
  }

}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{
    collection : 'projects'
  }])
)(ProjectDetails);
