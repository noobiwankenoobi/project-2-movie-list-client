'use strict'

const store = require('../store.js')
const showMoviesTemplate = require('../templates/moviesTable.handlebars')
const api = require('./api')
const getFormFields = require('../../../lib/get-form-fields')
const userAuthUi = require('../userAuth/ui.js')
const moviesPage = require('../templates/moviesPage.handlebars')
const moviePageView = require('../templates/moviePageView.handlebars')

// HELPER FUNCTIONS | HELPER FUNCTIONS | HELPER FUNCTIONS | HELPER FUNCTIONS |
// HELPER FUNCTIONS | HELPER FUNCTIONS | HELPER FUNCTIONS | HELPER FUNCTIONS |
// HELPER FUNCTIONS | HELPER FUNCTIONS | HELPER FUNCTIONS | HELPER FUNCTIONS |
// HELPER FUNCTIONS | HELPER FUNCTIONS | HELPER FUNCTIONS | HELPER FUNCTIONS |

// [REFRESH MOVIES DATA] |
const refreshMoviesData = () => {
  api.getMovies()
    .then(getMoviesSuccessQuiet)
    .catch(getMoviesFailure)
}

// [REFRESH ALL MOVIES] | [REFRESH ALL MOVIES] | [REFRESH ALL MOVIES] | [REFRESH ALL MOVIES] |
const refreshAllMovies = () => {
  const allMoviesHTML = moviesPage({movies: store.movies})
  $('#content').empty()
  $('#content').append(allMoviesHTML)
  $('.view-movie-page-button').on('click', showMoviePage)
}

const refreshUserMovies = () => {
  const userMoviesHTML = moviesPage({movies: store.userMovies})
  $('#content').empty()
  $('#content').append(userMoviesHTML)
  $('.view-movie-page-button').on('click', showMoviePage)
}

// [REFRESH MOVIE PAGE] | [REFRESH MOVIE PAGE] | [REFRESH MOVIE PAGE] | [REFRESH MOVIE PAGE] |
// const refreshMoviePage = () => {
//  $('.edit-movie-button').on('click', showUpdateFields)
// $('.delete-movie-button').on('click', deleteMovie)
// }

const clearUpdateInputFields = () => {
  // $('#update-movie-input-id').val('')
  // $('#update-movie-input-movie-title').val('')
  // $('#update-movie-input-director').val('')
  // $('#update-movie-input-comment').val('')
}

// [GET ALL] MOVIES
// [GET ALL] MOVIES
const getMoviesSuccess = (data) => {
  userAuthUi.userMessage('Found Some Movies!')
  store.movies = data.movies
  refreshAllMovies()
}

const getMoviesSuccessQuiet = (data) => {
  store.movies = data.movies
  refreshAllMovies()
}

const getMoviesFailure = (error) => {
  userAuthUi.userMessage('Failed to get Movies!')
  console.error(error)
}

// [GET USER] MOVIES
// [GET USER] MOVIES
const getUserMoviesSuccess = (data) => {
  userAuthUi.userMessage('Found Your Movies!')
  store.movies = data.movies
  store.userMovies = data.movies.filter((movie) => {
    return store.user.id === movie.user_id
  })
  refreshUserMovies()
}

const getUserMoviesFailure = (error) => {
  userAuthUi.userMessage('Failed to get Your Movies!')
  console.error(error)
}

// [UPDATE] MOVIE
// [UPDATE] MOVIE
const updateMovieSuccess = () => {
  userAuthUi.userMessage('Movie Updated Successfully!')
  refreshMoviesData()
  clearUpdateInputFields()
  $('.update-field').hide()
}

const updateMovieFailure = (error) => {
  userAuthUi.userMessage('Failed to Update Movie!')
  console.error(error)
}

const updateMovie = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  refreshAllMovies()
  if (data.movie.title.trim()) {
    api.updateMovie(data)
      .then(updateMovieSuccess)
      .catch(updateMovieFailure)
  } else {
    userAuthUi.userMessage('You Must Enter a Title')
  }
}

const showUpdateFields = (event) => {
  event.preventDefault()
  const currentMovieId = $(event.target).attr('data-id')
  $('#update-movie-input-id').val(currentMovieId)
  const currentMovieArray = store.movies.filter((movie) => {
    return String(movie.id) === currentMovieId
  })
  const currentMovie = currentMovieArray[0]

// UPDATE FIELD VALS
  $('#update-movie-input-title').val(currentMovie.title)
  $('#update-movie-input-director').val(currentMovie.director)
  $('#update-movie-input-comment').val(currentMovie.comment)

// SHOW / HIDE
  $('.update-field').show()
  $('#update-id-div').hide()

  $('#update-movie-input-forms').on('submit', updateMovie)
  $('#cancel-update-submit-button').on('click', () => { $('.update-field').hide() })
}

const showMoviePage = (event) => {
  event.preventDefault()
  const currentMovieId = $(event.target).attr('data-id')
  const currentMovieArray = store.movies.filter((movie) => {
    return String(movie.id) === currentMovieId
  })
  const currentMovie = currentMovieArray[0]
  const moviePageHTML = moviePageView({movie: currentMovie})
  $('#content').empty()
  $('#content').append(moviePageHTML)
}

// [DELETE] MOVIE | [DELETE] MOVIE | [DELETE] MOVIE | [DELETE] MOVIE | [DELETE] MOVIE
// [DELETE] MOVIE | [DELETE] MOVIE | [DELETE] MOVIE | [DELETE] MOVIE | [DELETE] MOVIE

const deleteMovieSuccess = () => {
  userAuthUi.userMessage('Movie Deleted!')
  refreshMoviesData()
}

const deleteMovieFailure = (error) => {
  userAuthUi.userMessage('Failed to Delete Movie!')
  console.error(error)
}

const deleteMovie = (event) => {
  event.preventDefault()
  const movieId = $(event.target).attr('data-id')
  store.movies = store.movies.filter((movie) => {
    return String(movie.id) !== String(movieId)
  })
  refreshAllMovies()
  api.deleteMovie(movieId)
    .then(deleteMovieSuccess)
    .catch(deleteMovieFailure)
}

// [CREATE] NEW MOVIE
// [CREATE] NEW MOVIE

const newMovieSuccess = () => {
  userAuthUi.userMessage('Added New Movie!')
  refreshMoviesData()
  $('#create-new-movie-input-forms').val('')
  $('#form-fields-handlebars-insert').empty()
}

const newMovieFailure = (error) => {
  userAuthUi.userMessage('Failed to add New Movie!')
  console.error(error)
}

module.exports = {
  newMovieSuccess,
  newMovieFailure,
  getMoviesSuccess,
  getMoviesFailure,
  updateMovie,
  getUserMoviesSuccess,
  getUserMoviesFailure
}
