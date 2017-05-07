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

module.exports = {
  newMoviePost,
  getMovies
}
