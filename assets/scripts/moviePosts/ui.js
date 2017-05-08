'use strict'

const store = require('../store.js')
const showMoviePostsTemplate = require('../templates/moviePosts.handlebars')
const api = require('./api')
// const getFormFields = require('../../../lib/get-form-fields')

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
  // $('#get-movies').click()
  api.getMovies()
    .then(getMoviesSuccess)
    .catch(getMoviesFailure)
  // Ask Mike^^which one to do
}

const deleteMoviePostFailure = (error) => {
  console.error(error)
}

const refreshMoviePostsTable = () => {
  const showMoviePostsHtml = showMoviePostsTemplate({ moviePosts: store.moviePosts })
  $('#content').empty()
  $('#content').append(showMoviePostsHtml)
  $('.update-movie-post').on('click', updateMoviePost)
  $('.delete-movie-post').on('click', deleteMoviePost)
}

const newMoviePostSuccess = (data) => {
  store.moviePosts = data.movie_posts
  refreshMoviePostsTable()
  // $('#movie_post')[0].reset()
  console.log(data)
}

const deleteMoviePost = (event) => {
  event.preventDefault()
  console.log(event.target)
  const moviePostId = $(event.target).attr('data-id')
  store.moviePosts = store.moviePosts.filter((moviePost) => {
    return String(moviePost.id) !== String(moviePostId)
  })
  refreshMoviePostsTable()
  api.deleteMovie(moviePostId)
    .then(deleteMoviePostSuccess)
    .catch(deleteMoviePostFailure)
}

const getMoviesSuccess = (data) => {
  store.moviePosts = data.movie_posts
  refreshMoviePostsTable()
}

const getMoviesFailure = (error) => {
  console.error(error)
}

module.exports = {
  newMoviePostSuccess,
  newMoviePostFailure,
  getMoviesSuccess,
  getMoviesFailure
}
