'use strict'

const store = require('../store.js')
const showMoviePostsTemplate = require('../templates/moviePosts.handlebars')
const api = require('./api')
const getFormFields = require('../../../lib/get-form-fields')

// [GET ALL] MOVIES
// [GET ALL] MOVIES

const getMoviesSuccess = (data) => {
  store.moviePosts = data.movie_posts
  refreshMoviePostsTable()
}

const getMoviesFailure = (error) => {
  console.error(error)
}

// HELPER FUNCTIONS FOR REFRESHING
// HELPER FUNCTIONS FOR REFRESHING

const refreshMoviePostsData = () => {
  api.getMovies()
    .then(getMoviesSuccess)
    .catch(getMoviesFailure)
}

const populateUpdatePostFields = () => {
  // store.moviePost = data.movie_post

  $('#update-post-input-id').val('')
  $('#update-post-input-movie-title').val('')
  $('#update-post-input-director').val('')
  $('#update-post-input-comment').val('')
}

const showUpdateFields = () => {
  $('.update-field').show()
  // populateUpdatePostFields()
  // $('.update-movie-post-input').on('submit', updateMoviePost)
}

const refreshMoviePostsTable = () => {
  const showMoviePostsHtml = showMoviePostsTemplate({ moviePosts: store.moviePosts })
  $('#content').empty()
  $('#content').append(showMoviePostsHtml)
  $('.edit-movie-button').on('click', showUpdateFields)
  $('.delete-movie-post').on('click', deleteMoviePost)
}

// [UPDATE] MOVIE POST
// [UPDATE] MOVIE POST

const updateMoviePostSuccess = () => {
  refreshMoviePostsData()
}

const updateMoviePostFailure = (error) => {
  console.error(error)
}
const updateMoviePost = (updatedData) => {
  event.preventDefault()
  const updatedData = getFormFields(event.target)
  const moviePostId = $(event.target).attr('data-id')
  // store.moviePosts = store.moviePosts.filter((moviePost) => {
  //   return String(moviePost.id) !== String(moviePostId)
  // })
  refreshMoviePostsTable()
  api.updateMoviePost(updatedData, moviePostId)
    .then(deleteMoviePostSuccess)
    .catch(deleteMoviePostFailure)
}
// [DELETE] MOVIE POST
// [DELETE] MOVIE POST

const deleteMoviePostSuccess = () => {
  refreshMoviePostsData()
}

const deleteMoviePostFailure = (error) => {
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
  refreshMoviePostsData()
  $('.new-movie-post-input').val('')
}

const newMoviePostFailure = (error) => {
  console.error(error)
}

module.exports = {
  newMoviePostSuccess,
  newMoviePostFailure,
  getMoviesSuccess,
  getMoviesFailure
}
