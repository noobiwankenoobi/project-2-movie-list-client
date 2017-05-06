'use strict'

const config = require('../config')
const store = require('../store')

const signUp = (data) => {
  return $.ajax({
    method: 'POST',
    url: config.apiOrigin + '/sign-up/',
    data: data
  })
}

const signIn = (data) => {
  return $.ajax({
    method: 'POST',
    url: config.apiOrigin + '/sign-in/',
    data: data
  })
}

const changePassword = (data) => {
  return $.ajax({
    method: 'PATCH',
    url: config.apiOrigin + '/change-password/' + store.user.id,
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data
  })
}

const signOut = () => {
  return $.ajax({
    method: 'DELETE',
    url: config.apiOrigin + '/sign-out/' + store.user.id,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  signUp,
  signIn,
  changePassword,
  signOut
}
