'use strict'

const getFormFields = require('../../../lib/get-form-fields')

const api = require('./api')
const ui = require('./ui.js')

// Authentication Events
const onNewMoviePost = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.newMoviePost(data)
    .then(ui.newMoviePostSuccess)
    .catch(ui.newMoviePostFailure)
}

const addHandlers = () => {
  $('#new-movie-post').on('submit', onNewMoviePost)
}

module.exports = {
  addHandlers
}
