import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './store/reducers/rootReducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import fbConfig from './config/fbConfig'

const store = createStore(rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
    /*
    reactReduxFirebase -> redux binding for firebase
    1) attachAuthIsReady -> allows us to access firebaseAuthIsReady function to render stuff after auth initialization
    2) useFirestoreForProfile -> Populates the profile property inside the firebase property finally recieved in props of a component
    after we recieve it in mapStateToProps and pass it to the props
    3) userProfile -> Where can we find the details of the profile in firestore
    */
    reactReduxFirebase(fbConfig, { useFirestoreForProfile: true,
                                    userProfile: 'users',
                                    attachAuthIsReady : true }),
    reduxFirestore(fbConfig) // redux bindings for firestore
  )
);

// Render only after firebase Auth is ready i.e after verifying if signed out or signed in
store.firebaseAuthIsReady.then(()=> {
  ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
  registerServiceWorker();
})
