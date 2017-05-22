'use strict'

const getFormFields = require('../../../lib/get-form-fields')

const api = require('./api')
const ui = require('./ui.js')
const userAuthUi = require('../userAuth/ui.js')
// const showCreateMoviePostFields = require('../templates/createMoviePostFields.handlebars')

// Needs finishing
const onNewMoviePost = function (event) {
  console.log(event.target)
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

const addHandlers = () => {
  $('#create-new-movie-post-input-forms').on('submit', onNewMoviePost)
  $('#get-movie-posts').on('click', onGetMoviePosts)
}

module.exports = {
  addHandlers,
  onNewMoviePost,
  onGetMoviePosts
}
