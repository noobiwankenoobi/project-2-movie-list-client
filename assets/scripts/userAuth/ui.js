'use strict'

const store = require('../store.js')

const signUpSuccess = (data) => {
  console.log(data)
}

const signUpFailure = (error) => {
  console.error(error)
}

const signInSuccess = (data) => {
  $('.signed-in-view').show()
  $('.signed-out-view').hide()
  $('#my-movies-table').hide()
  $('.update-movie-post').hide()
  store.user = data.user
}

const signInFailure = (error) => {
  console.error(error)
}

const changePasswordSuccess = (data) => {
  console.log('response is ', data)
}

const changePasswordFailure = (error) => {
  console.error(error)
}

const signOutSuccess = () => {
  store.user = null
  $('.signed-in-view').hide()
  $('.signed-out-view').show()
}

const signOutFailure = (error) => {
  console.error('error on sign out is ', error)
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInFailure,
  signInSuccess,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure
}
