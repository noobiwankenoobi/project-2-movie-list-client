'use strict'

const config = require('../config')
const store = require('../store')

const newMoviePost = (data) => {
  console.log('newMoviePost is running!')
  return $.ajax({
    method: 'POST',
    url: config.apiOrigin + '/movie-post/',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data: data
  })
}

module.exports = {
  newMoviePost
}
