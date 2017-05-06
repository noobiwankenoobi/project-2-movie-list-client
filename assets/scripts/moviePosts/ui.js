'use strict'

// const store = require('../store.js')

const newMoviePostSuccess = (data) => {
  console.log(data)
  console.log('newMoviePostSuccess is running!')
}

const newMoviePostFailure = (error) => {
  console.error(error)
  console.log('newMoviePostFailure is running!')
}

module.exports = {
  newMoviePostSuccess,
  newMoviePostFailure
}
