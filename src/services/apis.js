const BASE_URL = process.env.REACT_APP_BASE_URL

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
}

//ADMIN ENDPOINTS
export const adminEndpoints = {
  VIEW_USER_API: BASE_URL + "/admin/view-user",
  APPROVE_USERS_API: BASE_URL + "/admin/approve-users"
}

//DONOR ENDPOINTS
export const donorEndpoints = {
  ADD_DONOR_DETAILS_API: BASE_URL + "/donor/add-donor-details",
  VIEW_RECEPIENTS_API: BASE_URL + "/donor/view-recepients",
  EDIT_DONOR_DETAILS_API: BASE_URL + "/donor/edit-donor-details",
  GET_FULL_DONOR_DETAILS_API: BASE_URL + "/donor/get-full-donor-details",
  VIEW_DONOR_DETAILS_API: BASE_URL + "/donor/view-donor-details",
  DELETE_DONOR_DETAILS_API: BASE_URL + "/donor/delete-donor-details" ,
  GET_SINGLE_RECEPIENT_CARD_DETAILS: BASE_URL + "/donor/view-recepient-single-card-details"
}

//RECEPIENT ENDPOINTS
export const recepientEndpoints = {
  VIEW_DONORS_API: BASE_URL + "/recepient/view-donors",
  ADD_RECEPIENT_DETAILS_API: BASE_URL + "/recepient/add-recepient-details",
  EDIT_RECEPIENT_DETAILS_API: BASE_URL + "/recepient/edit-recepient-details",
  GET_FULL_RECEPIENT_DETAILS_API: BASE_URL + "/recepient/get-full-recepient-details",
  VIEW_RECEPIENT_DETAILS_API: BASE_URL + "/recepient/view-recepient-details",
  DELETE_RECEPIENT_DETAILS_API: BASE_URL + "/recepient/delete-recepient-details",
  GET_SINGLE_DONOR_CARD_DETAILS: BASE_URL + "/recepient/view-donor-single-card-details"
}

// CONTACT-US API
export const contactUsEndpoint = {
  CONTACT_US_API: BASE_URL + "/reach/contact",
}

// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
}