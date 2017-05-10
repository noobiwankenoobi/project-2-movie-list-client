'use strict'

const store = require('../store.js')
const showMoviePostsTemplate = require('../templates/moviePosts.handlebars')
const api = require('./api')
const getFormFields = require('../../../lib/get-form-fields')
const userAuthUi = require('../userAuth/ui.js')

// [GET ALL] MOVIES
// [GET ALL] MOVIES

const getMoviesSuccess = (data) => {
  userAuthUi.userMessage('Found Some Movies!')
  store.moviePosts = data.movie_posts
  refreshMoviePostsTable()
}

const getMoviesSuccessQuiet = (data) => {
  store.moviePosts = data.movie_posts
  refreshMoviePostsTable()
}

const getMoviesFailure = (error) => {
  userAuthUi.userMessage('Failed to get Movies!')
  console.error(error)
}

// HELPER FUNCTIONS FOR REFRESHING
// HELPER FUNCTIONS FOR REFRESHING

const refreshMoviePostsData = () => {
  api.getMovies()
    .then(getMoviesSuccessQuiet)
    .catch(getMoviesFailure)
}

const clearUpdateInputFields = () => {
  $('#update-post-input-id').val('')
  $('#update-post-input-movie-title').val('')
  $('#update-post-input-director').val('')
  $('#update-post-input-comment').val('')
}

// [UPDATE] MOVIE POST
// [UPDATE] MOVIE POST

const updateMoviePostSuccess = () => {
  userAuthUi.userMessage('Movie Updated Successfully!')
  refreshMoviePostsData()
  clearUpdateInputFields()
  $('.update-field').hide()
}

const updateMoviePostFailure = (error) => {
  userAuthUi.userMessage('Failed to Update Movie!')
  console.error(error)
}

const updateMoviePost = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  refreshMoviePostsTable()
  api.updateMovie(data)
    .then(updateMoviePostSuccess)
    .catch(updateMoviePostFailure)
}

const showUpdateFields = (event) => {
  event.preventDefault()
  const currentPostId = $(event.target).attr('data-id')
  $('#update-post-input-id').val(currentPostId)
  const currentPostArray = store.moviePosts.filter((moviePost) => {
    return String(moviePost.id) === currentPostId
  })
  const currentPost = currentPostArray[0]

// UPDATE FIELD VALS
  $('#update-post-input-movie-title').val(currentPost.title)
  $('#update-post-input-director').val(currentPost.director)
  $('#update-post-input-comment').val(currentPost.comment)

// SHOW / HIDE
  $('.update-field').show()
  $('#update-id-div').hide()

  $('#update-movie-post-input-forms').on('submit', updateMoviePost)
  $('#cancel-update-submit-button').on('click', () => { $('.update-field').hide() })
}

// REFRESH TABLE
// REFRESH TABLE

const refreshMoviePostsTable = () => {
  const showMoviePostsHtml = showMoviePostsTemplate({ moviePosts: store.moviePosts })
  $('#content').empty()
  $('#content').append(showMoviePostsHtml)
  $('.edit-movie-button').on('click', showUpdateFields)
  $('.delete-movie-post').on('click', deleteMoviePost)
}

// [DELETE] MOVIE POST
// [DELETE] MOVIE POST

const deleteMoviePostSuccess = () => {
  userAuthUi.userMessage('Movie Deleted!')
  refreshMoviePostsData()
}

const deleteMoviePostFailure = (error) => {
  userAuthUi.userMessage('Failed to Delete Movie!')
  console.error(error)
}

const deleteMoviePost = (event) => {
  event.preventDefault()
  const moviePostId = $(event.target).attr('data-id')
  store.moviePosts = store.moviePosts.filter((moviePost) => {
    return String(moviePost.id) !== String(moviePostId)
  })
  refreshMoviePostsTable()
  api.deleteMovie(moviePostId)
    .then(deleteMoviePostSuccess)
    .catch(deleteMoviePostFailure)
}

// [CREATE] NEW MOVIE POST
// [CREATE] NEW MOVIE POST

const newMoviePostSuccess = () => {
  userAuthUi.userMessage('Added New Movie!')
  refreshMoviePostsData()
  $('.new-movie-post-input').val('')
}

const newMoviePostFailure = (error) => {
  userAuthUi.userMessage('Failed to add New Movie!')
  console.error(error)
}

module.exports = {
  newMoviePostSuccess,
  newMoviePostFailure,
  getMoviesSuccess,
  getMoviesFailure,
  updateMoviePost
}
