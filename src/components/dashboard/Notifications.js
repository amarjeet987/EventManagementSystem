import React from 'react'
import moment from 'moment'

const Notifications = (props) => {
  return (
    <div className="section">
      <div className="card z-depth-0">
        <div className="card-content">
          <span className="card-title">Notifications</span>
          <ul className="notifications">
            { props.notifs && props.notifs.map(notif => {
              return (
                <div key={notif.id}>
                  <p className="pink-text">{notif.user}</p>
                  <p> {notif.content}</p>
                  <p className="grey-text">{moment(notif.time.toDate()).fromNow()}</p>
                </div>
              );
            }) }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Notifications
