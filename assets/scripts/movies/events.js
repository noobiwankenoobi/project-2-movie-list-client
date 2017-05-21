'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const showCreateMovieFields = require('../templates/createMovieFields.handlebars')

const api = require('./api')
const ui = require('./ui.js')
const userAuthUi = require('../userAuth/ui.js')

const onNewMovie = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  console.log(data)
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

const onShowCreateMovieFields = function (event) {
  event.preventDefault()
  const showCreateMovieFieldsHtml = showCreateMovieFields()
  $('#content').empty()
  $('#form-fields-handlebars-insert').append(showCreateMovieFieldsHtml)
  $('#create-new-movie-input-forms').on('submit', onNewMovie)
}

const onHideCreateMovieFields = function (event) {
  $('#content').empty()
  $('#form-fields-handlebars-insert').empty()
}

const addHandlers = () => {
  $('#show-create-movie-fields').on('click', onShowCreateMovieFields)
  $('#hide-create-movie-fields').on('click', onHideCreateMovieFields)
  // $('#get-movies').on('click', onGetMovies)
  $('#hide-movies').on('click', onHideMovies)
  $('#all-movies-button').on('click', onGetMovies)
}

module.exports = {
  addHandlers
}
