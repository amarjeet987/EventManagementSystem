const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// function to create notification in firestore
const createNotification = (notification) => {
  return admin.firestore().collection('notifications')
         .add(notification)
         .then(doc => console.log("Notification added", doc))
}

// trigger when project is added
exports.projectCreated = functions.firestore
  .document('projects/{projectID}')
  .onCreate(doc => {
    const project = doc.data();
    const notification = {
      content : "Added a new task : " + `${project.title}`,
      user : `${project.authorFirstName} ${project.authorLastName}`,
      time : admin.firestore.FieldValue.serverTimestamp()
    }

    return createNotification(notification);
  })

  // trigger when project is removed
  exports.projectDeleted = functions.firestore
    .document('projects/{projectID}')
    .onDelete(doc => {
      const project = doc.data();
      const notification = {
        content : "Did task : " + `${project.title}`,
        user : `${project.authorFirstName} ${project.authorLastName}`,
        time : admin.firestore.FieldValue.serverTimestamp()
      }

      return createNotification(notification);
    })

// trigger whenever a new user is created
exports.userJoined = functions.auth
  .user()
  .onCreate(user => {
    return admin.firestore().collection('users')
           .doc(user.uid).get()
           .then(doc => {
             // get the userID here
             const user = doc.data();
             console.log(user);
             const notification = {
               content : 'Joined the staff',
               user : `${user.firstName} ${user.lastName}`,
               time : admin.firestore.FieldValue.serverTimestamp()
             }

            return createNotification(notification);

           })
  })
