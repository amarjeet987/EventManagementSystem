export const createProject = (project) => {
  return (dispatch, getState, {getFirestore}) => {
    // make async call to database
    const state = getState();
    const firestore = getFirestore();
    firestore.collection('projects').add({
      ...project,
      authorFirstName: state.firebase.profile.firstName,
      authorLastName: state.firebase.profile.lastName,
      authorId: 12345,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_PROJECT_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'CREATE_PROJECT_ERROR', err});
    });

  }
};

export const deleteProject = (project_id) => {
  console.log(project_id);
  return (dispatch, getState, {getFirestore}) => {
    const state = getState();
    const firestore = getFirestore();
    firestore.collection('projects').doc(project_id)
    .delete()
    .then(()=> {
      window.location.reload();
      dispatch({ type : "DELETED_PROJECT" })
    })
    .catch(err => {
      dispatch({ type : "DELETED_PROJECT_ERR", err })
    })
  }
}
