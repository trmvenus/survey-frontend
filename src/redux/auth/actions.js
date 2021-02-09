import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_ERROR,
  REGISTER_USER_ERROR,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_ERROR,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  GET_CURRENT_USER,
  GET_CURRENT_USER_SUCCESS,
  GET_CURRENT_USER_ERROR,
  UPDATE_USER_PROFILE,
  UPDATE_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_ERROR,
  GET_ADDITIONAL_USER_INFO,
  GET_ADDITIONAL_USER_INFO_SUCCESS,
  GET_ADDITIONAL_USER_INFO_ERROR,
  UPDATE_PASSWORD,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_ERROR,
} from '../actions';

export const loginUser = (user, history) => ({
  type: LOGIN_USER,
  payload: { user, history },
});
export const loginUserSuccess = (user) => ({
  type: LOGIN_USER_SUCCESS,
  payload: user,
});
export const loginUserError = (message) => ({
  type: LOGIN_USER_ERROR,
  payload: { message },
});

export const forgotPassword = (forgotUserMail, history) => ({
  type: FORGOT_PASSWORD,
  payload: { forgotUserMail, history },
});
export const forgotPasswordSuccess = (forgotUserMail) => ({
  type: FORGOT_PASSWORD_SUCCESS,
  payload: forgotUserMail,
});
export const forgotPasswordError = (message) => ({
  type: FORGOT_PASSWORD_ERROR,
  payload: { message },
});

export const resetPassword = ({ resetPasswordCode, newPassword, history }) => ({
  type: RESET_PASSWORD,
  payload: { resetPasswordCode, newPassword, history },
});
export const resetPasswordSuccess = (newPassword) => ({
  type: RESET_PASSWORD_SUCCESS,
  payload: newPassword,
});
export const resetPasswordError = (message) => ({
  type: RESET_PASSWORD_ERROR,
  payload: { message },
});

export const registerUser = (user, history) => ({
  type: REGISTER_USER,
  payload: { user, history },
});
export const registerUserSuccess = (user) => ({
  type: REGISTER_USER_SUCCESS,
  payload: user,
});
export const registerUserError = (message) => ({
  type: REGISTER_USER_ERROR,
  payload: { message },
});

export const logoutUser = (history) => ({
  type: LOGOUT_USER,
  payload: { history },
});

export const getCurrentUser = () => ({
  type: GET_CURRENT_USER,
});
export const getCurrentUserSuccess = (user) => ({
  type: GET_CURRENT_USER_SUCCESS,
  payload: user,
});
export const getCurrentUserError = (error) => ({
  type: GET_CURRENT_USER_ERROR,
  payload: error,
});

export const getAdditionalUserInfo = () => ({
  type: GET_ADDITIONAL_USER_INFO,
});
export const getAdditionalUserInfoSuccess = (info) => ({
  type: GET_ADDITIONAL_USER_INFO_SUCCESS,
  payload: info,
});
export const getAdditionalUserInfoError = (error) => ({
  type: GET_ADDITIONAL_USER_INFO_ERROR,
  payload: error,
});

export const updateUserProfile = (profile) => ({
  type: UPDATE_USER_PROFILE,
  payload: profile,
});
export const updateUserProfileSuccess = (user) => ({
  type: UPDATE_USER_PROFILE_SUCCESS,
  payload: user,
});
export const updateUserProfileError = (error) => ({
  type: UPDATE_USER_PROFILE_ERROR,
  payload: error,
});

export const updatePassword = (password) => ({
  type: UPDATE_PASSWORD,
  payload: {password}
});
export const updatePasswordSuccess = (payload) => ({
  type: UPDATE_PASSWORD_SUCCESS,
  payload,
});
export const updatePasswordError = (error) => ({
  type: UPDATE_PASSWORD_ERROR,
  payload: error,
});
