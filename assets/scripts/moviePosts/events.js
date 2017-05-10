'use strict'

const getFormFields = require('../../../lib/get-form-fields')

const api = require('./api')
const ui = require('./ui.js')
const userAuthUi = require('../userAuth/ui.js')

const onNewMoviePost = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  if (data.movie_post.title.trim() && data.movie_post.director.trim()) {
    api.newMoviePost(data)
      .then(ui.newMoviePostSuccess)
      .catch(ui.newMoviePostFailure)
  } else {
    userAuthUi.userMessage('You Must Enter a Title and Director')
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
  $('#movie_post').on('submit', onNewMoviePost)
  $('#get-movies').on('click', onGetMovies)
  $('#hide-movies').on('click', onHideMovies)
}

module.exports = {
  addHandlers
}
