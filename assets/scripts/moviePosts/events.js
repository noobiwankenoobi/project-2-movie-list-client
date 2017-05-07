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

const onGetMovies = function (event) {
  event.preventDefault()
  api.getMovies()
    .then(ui.getMoviesSuccess)
    .catch(ui.getMoviesFailure)
}

const addHandlers = () => {
  $('#movie_post').on('submit', onNewMoviePost)
  $('#get-movies').on('click', onGetMovies)
}

module.exports = {
  addHandlers
}
