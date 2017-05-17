'use strict'

const getFormFields = require('../../../lib/get-form-fields')

const api = require('./api')
const ui = require('./ui.js')
const userAuthUi = require('../userAuth/ui.js')

const onNewMovie = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  if (data.movie.title.trim()) {
    api.newMovie(data)
      .then(ui.newMovieSuccess)
      .catch(ui.newMovieFailure)
  } else {
    userAuthUi.userMessage('You Must Enter a Title')
  }
}

const onGetMovies = function (event) {
  event.preventDefault()
  api.getMovies()
    .then(ui.getMoviesSuccess)
    .catch(ui.getMoviesFailure)
}

const onHideMovies = function (event) {
  event.preventDefault()
  $('#content').empty()
}

const addHandlers = () => {
  $('#new-movie-form').on('submit', onNewMovie)
  $('#get-movies').on('click', onGetMovies)
  $('#hide-movies').on('click', onHideMovies)
}

module.exports = {
  addHandlers
}
