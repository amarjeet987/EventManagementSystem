import React from 'react'
import { NavLink } from 'react-router-dom'
import { signOut } from '../../store/actions/authActions';
import { connect } from 'react-redux';

const SignedInLinks = (props) => {

  const initials = props.profile.initials ? props.profile.initials.toUpperCase() : "";
  return (
    <div>
      <ul className="right">
        <li><NavLink to='/create'>New Task</NavLink></li>
        <li><a onClick={props.signOut}>Log Out</a></li>
        <li><NavLink to='/' className="btn btn-floating pink lighten-1">{initials}</NavLink></li>
      </ul>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut : ()=> dispatch(signOut())
  }
}

export default connect(null, mapDispatchToProps)(SignedInLinks)
