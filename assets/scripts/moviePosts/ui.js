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

const clearUpdateInputFields = () => {
  $('#update-post-input-id').val('')
  $('#update-post-input-movie-title').val('')
  $('#update-post-input-director').val('')
  $('#update-post-input-comment').val('')
}

// [UPDATE] MOVIE POST
// [UPDATE] MOVIE POST

const updateMoviePostSuccess = () => {
  refreshMoviePostsData()
  clearUpdateInputFields()
  $('.update-field').hide()
}

const updateMoviePostFailure = (error) => {
  console.error(error)
}

// NEEDS MAJOR WORK
const updateMoviePost = (event) => {
  console.log(event.target)
  event.preventDefault()
  const data = getFormFields(event.target)
  refreshMoviePostsTable()
  api.updateMovie(data)
    .then(updateMoviePostSuccess)
    .catch(updateMoviePostFailure)
}

const showUpdateFields = () => {
  console.log(event.target)
  event.preventDefault()
  $('#update-post-input-id').val($(event.target).attr('data-id'))
  // store.moviePosts = store.data.moviePosts
  // const currentMovie = store.moviePosts[event.target]
  // $('#update-post-input-movie-title').val(currentMovie.title)
  // $('#update-post-input-director').val(currentMovie.director)
  // $('#update-post-input-comment').val(currentMovie.comment)
  $('.update-field').show()
  $('#update-id-div').hide()

  $('.update-movie-post-input-forms').on('submit', updateMoviePost)
}

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
  getMoviesFailure,
  updateMoviePost
}
