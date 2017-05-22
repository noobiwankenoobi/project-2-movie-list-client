'use strict'

const getFormFields = require('../../../lib/get-form-fields')

const api = require('./api')
const ui = require('./ui.js')
const userAuthUi = require('../userAuth/ui.js')
const showCreateMoviePostFields = require('../templates/createMoviePostFields.handlebars')

const onNewMoviePost = function (event) {
  event.preventDefault()
  const currentMovieId = $(event.target).attr('data-id')
  const commentingOnMovie = currentMovieId
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

const onShowCreateMoviePostFields = function (event) {
  event.preventDefault()
  const showCreateMoviePostFieldsHtml = showCreateMoviePostFields()
  $('#content').empty()
  $('#form-fields-handlebars-insert').empty()
  $('#form-fields-handlebars-insert').append(showCreateMoviePostFieldsHtml)
  $('#create-new-movie-post-input-forms').on('submit', onNewMoviePost)
}

const onHideCreateMoviePostFields = function (event) {
  event.preventDefault()
  $('#content').empty()
  $('#form-fields-handlebars-insert').empty()
  $('#create-new-movie-post-input-forms').val('')
}

const addHandlers = () => {
  $('#create-new-movie-post-input-forms').on('submit', onNewMoviePost)
  $('#get-movie-posts').on('click', onGetMoviePosts)
  $('#hide-movie-posts').on('click', onHideMoviePosts)
  $('#show-create-movie-post-fields').on('click', onShowCreateMoviePostFields)
  $('#hide-create-movie-post-fields').on('click', onHideCreateMoviePostFields)
}

module.exports = {
  addHandlers
}
