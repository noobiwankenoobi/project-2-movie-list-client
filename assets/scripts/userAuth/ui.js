'use strict'

const store = require('../store.js')

const signUpSuccess = (data) => {
  console.log(data)
}

const signUpFailure = (error) => {
  console.error(error)
}

const signInSuccess = (data) => {
  console.log('Sign in successful!', data)
  store.user = data.user
  $('.signed-in-view').show()
  $('.not-signed-in').hide()
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
  $('.not-signed-in').show()
  // console.log('Succesfully Signed Out')
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
