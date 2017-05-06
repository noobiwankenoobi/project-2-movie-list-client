'use strict'

// const store = require('../store.js')

const newMoviePostSuccess = (data) => {
  console.log(data)
}

const newMoviePostFailure = (error) => {
  console.error(error)
}

module.exports = {
  newMoviePostSuccess,
  newMoviePostFailure
}
