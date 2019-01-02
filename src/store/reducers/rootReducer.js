import authReducer from './authReducer'
import projectReducer from './projectReducer'
import { combineReducers } from 'redux'
// to keep firestore information synced, info can be recieved in the state in a component
import { firestoreReducer } from 'redux-firestore';
// to keep authentication and other firebase information synced, info can be recieved in the state in a component
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer

// the key name will be the data property on the state object
