'use strict'

const config = require('../config')
const store = require('../store')

const newMoviePost = (data) => {
  return $.ajax({
    method: 'POST',
    url: config.apiOrigin + '/movie_posts/',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data
  })
}

const getMovies = () => {
  return $.ajax({
    method: 'GET',
    url: config.apiOrigin + '/movie_posts/',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const deleteMovie = (moviePostId) => {
  return $.ajax({
    method: 'DELETE',
    url: config.apiOrigin + '/movie_posts/' + moviePostId,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updateMovie = (data) => {
  return $.ajax({
    method: 'PATCH',
    url: config.apiOrigin + '/movie_posts/' + data.movie_post.id,
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data
  })
}

module.exports = {
  newMoviePost,
  getMovies,
  deleteMovie,
  updateMovie
}
