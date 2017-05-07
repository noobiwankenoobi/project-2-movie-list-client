'use strict'

const store = require('../store.js')

const newMoviePostSuccess = (data) => {
  console.log(data)
}

const newMoviePostFailure = (error) => {
  console.error(error)
}

const getMoviesSuccess = (data) => {
  store.moviePosts = data.movie_posts
  let tableHTML = ''
  store.moviePosts.forEach((post) => {
    tableHTML += '<tr><td>' + post.title + '</td><td>' + post.director + '</td><td>' + post.comment + '</td> <td><button class="btn btn-warning btn-sm" data-id="update">Update Movie</button><button class="btn btn-danger btn-sm" data-id="delete">Delete Movie</button></td></tr>'
  })
  $('#my-movies-table-body').html(tableHTML)
  $('#my-movies-table').show()
  console.log(data)
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
