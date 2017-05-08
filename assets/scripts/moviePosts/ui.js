'use strict'

const store = require('../store.js')
const showMoviePostsTemplate = require('../templates/moviePosts.handlebars')
const api = require('./api')

const newMoviePostSuccess = (data) => {
  console.log(data)
}

const newMoviePostFailure = (error) => {
  console.error(error)
}

const updateMoviePost = (event) => {
  event.preventDefault()
  $('.update-movie-post').show()
}

const deleteMoviePostSuccess = () => {
  $('#get-movies').click()
  // swag^^^drive it like you own it^^^
  // api.getMovies()
  //   .then(getMoviesSuccess)
  //   .catch(getMoviesFailure)
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
