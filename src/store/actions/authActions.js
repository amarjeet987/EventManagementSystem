export const signIn = (credentials) => {
  // because of thunk, we can hold the dispatch to perform async requests
  // getState consists of the current state value
  return (dispatch, getState, { getFirebase }) => {
    // initialize firebase instance
    const firebase = getFirebase();
    firebase.auth().signInWithEmailAndPassword(
      credentials.email,
      credentials.password)
    .then((res)=> {
      dispatch({ type: "LOGIN_SUCCESS" })
    })
    .catch((err)=>{
      dispatch({ type: "LOGIN_ERROR", err })
    })
  }
}

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    firebase.auth().signOut()
    .then(()=> {
      dispatch({ type : "LOGOUT_SUCCESS" })
    })
  }
}

export const signUp = (userData) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();
    firebase.auth().createUserWithEmailAndPassword(
      userData.email,
      userData.password
    ).then((res)=> {
      // donot autogenerate ID, we pass our own id inside doc
      return firestore.collection('users').doc(res.user.uid).set({
        firstName : userData.firstName,
        lastName : userData.lastName,
        initials : userData.firstName[0] + userData.lastName[0]
      })
    }).then(()=> {
      dispatch({ type : "SIGNUP_SUCCESS" })
    }).catch((err) => {
      dispatch({ type : "SIGNUP_ERROR", err })
    });
  }
}
