'use strict'

const config = require('../config')
const store = require('../store')

const newMovie = (data) => {
  return $.ajax({
    method: 'POST',
    url: config.apiOrigin + '/movies/',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data
  })
}

const getMovies = () => {
  return $.ajax({
    method: 'GET',
    url: config.apiOrigin + '/movies/',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const deleteMovie = (movieId) => {
  return $.ajax({
    method: 'DELETE',
    url: config.apiOrigin + '/movies/' + movieId,
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updateMovie = (data) => {
  return $.ajax({
    method: 'PATCH',
    url: config.apiOrigin + '/movies/' + data.movie.id,
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data
  })
}

module.exports = {
  newMovie,
  getMovies,
  deleteMovie,
  updateMovie
}
