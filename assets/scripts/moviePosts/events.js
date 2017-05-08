'use strict'

const getFormFields = require('../../../lib/get-form-fields')

const api = require('./api')
const ui = require('./ui.js')

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

// const onUpdateMoviePost = function (event) {
//   event.preventDefault()
//   $('.update-movie-post').hide()
//   const data = getFormFields(event.target)
//   console.log('onUpdateMoviePost is running!', data)
//   api.updateMoviePost(data)
//     .then(ui.updateMoviePostSuccess)
//     .catch(ui.updateMoviePostFailure)
// }

const addHandlers = () => {
  $('#movie_post').on('submit', onNewMoviePost)
  $('#get-movies').on('click', onGetMovies)
  // $('#update-movie-post').on('submit', onUpdateMoviePost)
}

module.exports = {
  addHandlers
}
