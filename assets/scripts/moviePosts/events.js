'use strict'

const getFormFields = require('../../../lib/get-form-fields')

const api = require('./api')
const ui = require('./ui.js')
const userAuthUi = require('../userAuth/ui.js')

const onNewMoviePost = function (event) {
  event.preventDefault()
  const data = getFormFields(event.target)
  if (data.movie_post.comment.trim()) {
    api.newMoviePost(data)
      .then(ui.newMoviePostSuccess)
      .catch(ui.newMoviePostFailure)
  } else {
    userAuthUi.userMessage('You Must Enter a Comment')
  }
}

const onGetMoviePosts = function (event) {
  event.preventDefault()
  api.getMoviePosts()
    .then(ui.getMoviePostsSuccess)
    .catch(ui.getMoviePostsFailure)
}

const onHideMoviePosts = function (event) {
  event.preventDefault()
  $('#content').empty()
}

const addHandlers = () => {
  $('#movie_post').on('submit', onNewMoviePost)
  $('#get-movie-posts').on('click', onGetMoviePosts)
  $('#hide-movie-posts').on('click', onHideMoviePosts)
}

module.exports = {
  addHandlers
}
