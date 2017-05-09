'use strict'

const store = require('../store.js')
const showMoviePostsTemplate = require('../templates/moviePosts.handlebars')
const api = require('./api')
// const getFormFields = require('../../../lib/get-form-fields')

const getMoviesSuccess = (data) => {
  store.moviePosts = data.movie_posts
  refreshMoviePostsTable()
}

const getMoviesFailure = (error) => {
  console.error(error)
}

// Helper Functions
const refreshMoviePostsData = () => {
  api.getMovies()
    .then(getMoviesSuccess)
    .catch(getMoviesFailure)
}

const refreshMoviePostsTable = () => {
  const showMoviePostsHtml = showMoviePostsTemplate({ moviePosts: store.moviePosts })
  $('#content').empty()
  $('#content').append(showMoviePostsHtml)
  $('.update-movie-post').on('click', updateMoviePost)
  $('.delete-movie-post').on('click', deleteMoviePost)
}

const newMoviePostFailure = (error) => {
  console.error(error)
}

// const updateMoviePostFailure = () => {}
// const updateMoviePostSuccess = () => {}
//
const updateMoviePost = () => {}
//   event.preventDefault()
//   const updateMoviePostForm = showMoviePostsTemplate({ updatePosts: store.updatePosts })
//   $('.update-movie-post').show()
//   $('#update-field').append(updateMoviePostForm)
//   const data = getFormFields(event.target)
//   const moviePostId = $(event.target).attr('data-id')
//   // console.log('onUpdateMoviePost is running!', data)
//   api.updateMoviePost(moviePostId, data)
//     .then(updateMoviePostSuccess)
//     .catch(updateMoviePostFailure)
// }

const deleteMoviePostSuccess = () => {
  refreshMoviePostsData()
}

const deleteMoviePostFailure = (error) => {
  console.error(error)
}

const newMoviePostSuccess = () => {
  refreshMoviePostsData()
  $('.new-movie-post-input').val('')
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

module.exports = {
  newMoviePostSuccess,
  newMoviePostFailure,
  getMoviesSuccess,
  getMoviesFailure
}
