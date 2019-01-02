const initState = {
  authError: null
}

const authReducer = (state = initState, action) => {
  switch(action.type) {
    case "LOGIN_ERROR":
      return {
        ...state,
        authError: "login failed"
      }
    case "LOGIN_SUCCESS":
      return {
        ...state,
        authError: null
      }
    case "LOGOUT_SUCCESS":
      console.log("signout success");
      return state;
    case "SIGNUP_SUCCESS":
      console.log("Signup success")
      return {
        ...state,
        authError : null
      }
      case "SIGNUP_ERROR":
        return {
          ...state,
          authError : action.err.message
        }
    default:
      return {
        ...state,
        authError: null
      }
  }
};

export default authReducer;
