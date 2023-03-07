export default function passwordReducer(state, action) {
  switch (action.type) {
    case "password":
      return {
        ...state,
        password: action.value,
      };
    case "repeatPassword":
      return {
        ...state,
        repeatPassword: action.value,
      };
    case "passwordLength":
      return {
        ...state,
        isPasswordValid: false,
        passwordStatus: [action.value, state.passwordStatus[1]],
      };
    case "repeatPasswordVal":
      return {
        ...state,
        isPasswordValid: false,
        passwordStatus: [state.passwordStatus[0], action.value],
      };
    case "passwordValidity":
      return {
        ...state,
        isPasswordValid: true,
      };
    default:
      return {
        password: "",
        repeatPassword: "",
        isPasswordValid: null,
        passwordStatus: ["", ""],
      };
  }
}
