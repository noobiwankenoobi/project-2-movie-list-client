'use strict'

const store = require('../store.js')
// const showMoviesTemplate = require('../templates/moviesTable.handlebars')
const api = require('./api')
const moviePostsApi = require('../moviePosts/api')
const getFormFields = require('../../../lib/get-form-fields')
const userAuthUi = require('../userAuth/ui.js')
const moviesPage = require('../templates/moviesPage.handlebars')
const moviePageView = require('../templates/moviePageView.handlebars')
const createMovieFieldsView = require('../templates/createMovieFields.handlebars')

//
// [CREATE] NEW MOVIE | [CREATE] NEW MOVIE | [CREATE] NEW MOVIE | [CREATE] NEW MOVIE |
// [CREATE] NEW MOVIE | [CREATE] NEW MOVIE | [CREATE] NEW MOVIE | [CREATE] NEW MOVIE |
// [CREATE] NEW MOVIE | [CREATE] NEW MOVIE | [CREATE] NEW MOVIE | [CREATE] NEW MOVIE |
const newMovieSuccess = () => {
  userAuthUi.userMessage('Added New Movie!')
  refreshMoviesData()
  $('.create-new-movie-input-forms').val('')
  // $('#create-movie-modal').modal('hide')
}

const newMovieFailure = (error) => {
  userAuthUi.userMessage('Failed to add New Movie!')
  console.error(error)
}

const onNewMovie = function (event) {
  event.preventDefault()
  console.log('EVENT DOT TARGET IS: ', event.target)
  const data = getFormFields(event.target)
  console.log('EVENT DOT TARGET IS 2: ', event.target)
  console.log(data)
  // if (data.movie.title.trim()) {
  api.newMovie(data)
    .then(newMovieSuccess)
    .catch(newMovieFailure)
  // } else {
  //   userAuthUi.userMessage('You Must Enter a Title')
  // }
}

const onShowCreateMovieFields = function (event) {
  event.preventDefault()
  const createMovieFieldsHTML = createMovieFieldsView()
  $('#content').empty()
  $('#content').append(createMovieFieldsHTML)
  $('.movie_params').on('submit', onNewMovie)
  // $('#create-movie-modal').modal('show')
}

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
  $('.view-create-movie-fields-button').on('click', onShowCreateMovieFields)
}

// [REFRESH USER MOVIES] | [REFRESH USER MOVIES] | [REFRESH USER MOVIES] | [REFRESH USER MOVIES] |
const refreshUserMovies = () => {
  const userMoviesHTML = moviesPage({movies: store.userMovies})
  $('#content').empty()
  $('#content').append(userMoviesHTML)
  $('.view-movie-page-button').on('click', showMoviePage)
  // $('.view-create-movie-fields-button').on('click', onShowCreateMovieFields)
}

// [REFRESH MOVIE PAGE] | [REFRESH MOVIE PAGE] | [REFRESH MOVIE PAGE] | [REFRESH MOVIE PAGE] |
// const refreshMoviePage = () => {
//   $('.edit-movie-button').on('click', __)
//   $('.delete-movie-button').on('click', __)
// }

const onOpenEditMovieFields = () => {
  event.preventDefault()
  // $('#edit-movie-modal').modal('show')
  const currentMovieId = $(event.target).attr('data-id')
  $('#edit-movie-id-input').val(currentMovieId)
  const currentMovieArray = store.movies.filter((movie) => {
    return String(movie.id) === currentMovieId
  })
  const currentMovie = currentMovieArray[0]

  // UPDATE EDIT FIELD VALUES |
  $('#edit-movie-input-title').val(currentMovie.title)
  $('#edit-movie-input-title-imdb-url').val(currentMovie.title_imdb_url)

  $('#edit-movie-input-director').val(currentMovie.director)
  $('#edit-movie-input-director-imdb-url').val(currentMovie.director_imdb_url)

  $('#edit-movie-input-writer').val(currentMovie.writer)
  $('#edit-movie-input-writer-imdb-url').val(currentMovie.writer_imdb_url)

  $('#edit-movie-input-cinematographer').val(currentMovie.cinematographer)
  $('#edit-movie-input-title-imdb-url').val(currentMovie.cinematographer_imdb_url)

  $('#edit-movie-input-music').val(currentMovie.music)
  $('#edit-movie-input-music-imdb-url').val(currentMovie.music_imdb_url)

  $('#edit-movie-input-img_url').val(currentMovie.img_url)
  // SHOW EDIT MOVIE MODAL
}

// SHOW / HIDE
//   $('.update-field').show()
//   $('#update-id-div').hide()
//
//   $('#update-movie-input-forms').on('submit', onUpdateMovie)
//   $('#cancel-update-submit-button').on('click', () => { $('.update-field').hide() })
// }

const clearUpdateInputFields = () => {
  // $('#update-movie-input-id').val('')
  // $('#update-movie-input-movie-title').val('')
  // $('#update-movie-input-director').val('')
  // $('#update-movie-input-comment').val('')
}

//
// [GET (ALL)] MOVIES | [GET (ALL)] MOVIES | [GET (ALL)] MOVIES |
// [GET (ALL)] MOVIES | [GET (ALL)] MOVIES | [GET (ALL)] MOVIES |
// [GET (ALL)] MOVIES | [GET (ALL)] MOVIES | [GET (ALL)] MOVIES |
const getMoviesSuccess = (data) => {
  userAuthUi.userMessage('Found Some Movies!')
  store.movies = data.movies
  refreshAllMovies()
}

// same as getMoviesSuccess but without the success message
const getMoviesSuccessQuiet = (data) => {
  store.movies = data.movies
  refreshAllMovies()
}

const getMoviesFailure = (error) => {
  userAuthUi.userMessage('Failed to get Movies!')
  console.error(error)
}

// [GET (USER)] MOVIES | [GET (USER)] MOVIES | [GET (USER)] MOVIES |
// [GET (USER)] MOVIES | [GET (USER)] MOVIES | [GET (USER)] MOVIES |
// [GET (USER)] MOVIES | [GET (USER)] MOVIES | [GET (USER)] MOVIES |
const getUserMoviesSuccess = (data) => {
  userAuthUi.userMessage('Found Your Movies!')
  store.movies = data.movies
  store.userMovies = data.movies.filter((movie) => {
    return store.user.id === movie.user_id
  })
  refreshUserMovies()
  $('#show-create-movie-fields').on('click', onShowCreateMovieFields)
}

const getUserMoviesFailure = (error) => {
  userAuthUi.userMessage('Failed to get Your Movies!')
  console.error(error)
}

//
// [UPDATE] MOVIE | [UPDATE] MOVIE | [UPDATE] MOVIE | [UPDATE] MOVIE
// [UPDATE] MOVIE | [UPDATE] MOVIE | [UPDATE] MOVIE | [UPDATE] MOVIE
// [UPDATE] MOVIE | [UPDATE] MOVIE | [UPDATE] MOVIE | [UPDATE] MOVIE
const updateMovieSuccess = () => {
  userAuthUi.userMessage('Movie Updated Successfully!')
  refreshMoviesData()
  clearUpdateInputFields()
  $('.edit-movie-modal').hide()
}

const updateMovieFailure = (error) => {
  userAuthUi.userMessage('Failed to Update Movie!')
  console.error(error)
}

const onUpdateMovie = (event) => {
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

//
// [DELETE] MOVIE | [DELETE] MOVIE | [DELETE] MOVIE | [DELETE] MOVIE
// [DELETE] MOVIE | [DELETE] MOVIE | [DELETE] MOVIE | [DELETE] MOVIE
// [DELETE] MOVIE | [DELETE] MOVIE | [DELETE] MOVIE | [DELETE] MOVIE
//
// runs another get request which automatically feeds into refreshAllMovies
const deleteMovieSuccess = () => {
  userAuthUi.userMessage('Movie Deleted!')
  refreshMoviesData()
}

const deleteMovieFailure = (error) => {
  userAuthUi.userMessage('Failed to Delete Movie!')
  console.error(error)
}

const onDeleteMovie = (event) => {
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

//
// GET [MOVIE POSTS] (COMMENTS) RESPONSES | GET [MOVIE POSTS] (COMMENTS) RESPONSES
// GET [MOVIE POSTS] (COMMENTS) RESPONSES | GET [MOVIE POSTS] (COMMENTS) RESPONSES
const getMoviePostsSuccess = () => {
  // userAuthUi.userMessage('Loaded comments')
}

const getMoviePostsFailure = (error) => {
  userAuthUi.userMessage('Failed to get Movie Posts!')
  console.error(error)
}

//
// [SHOW MOVIE PAGE] Mother of all Functions | [SHOW MOVIE PAGE] Mother of all Functions
// [SHOW MOVIE PAGE] Mother of all Functions | [SHOW MOVIE PAGE] Mother of all Functions
// [SHOW MOVIE PAGE] Mother of all Functions | [SHOW MOVIE PAGE] Mother of all Functions
// this function gets movies from memory and stores both user movies and all movies
//
const showMoviePage = (event) => {
  event.preventDefault()
  const currentMovieId = $(event.target).attr('data-id')
  const currentMovieArray = store.movies.filter((movie) => {
    return String(movie.id) === currentMovieId
  })
  const currentMovie = currentMovieArray[0]
  currentMovie.isUserMovie = false
  if (store.user.id === currentMovie.user_id) {
    currentMovie.isUserMovie = true
  }
  moviePostsApi.getMoviePosts()
    .then((data) => {
      store.moviePosts = data.movie_posts
      store.currentMoviePosts = data.movie_posts.filter((moviePost) => {
        return moviePost.movie_id === currentMovie.id
      })
      store.currentMoviePosts.forEach((moviePost) => {
        moviePost.isUserMoviePost = false
        if (store.user.id === moviePost.user_id) {
          moviePost.isUserMoviePost = true
        }
      })
      const moviePageHTML = moviePageView({
        movie: currentMovie,
        comments: store.currentMoviePosts
      })
      // refresh the content of moviePageView and moviePosts
      $('#content').empty()
      $('#content').append(moviePageHTML)
      // add clicks for edit and delete Movie-- only owner of movie sees buttons
      $('.edit-movie-button').click(onOpenEditMovieFields)
      $('.delete-movie-button').click(onDeleteMovie)
      // add clicks for edit and delete Comment (moviePost)-- only owner of movie sees buttons
      $('.edit-comment-button').click('')
      $('.delete-comment-button').click('')
    })
    .then(getMoviePostsSuccess)
    .catch(getMoviePostsFailure)
}

module.exports = {
  newMovieSuccess,
  newMovieFailure,
  getMoviesSuccess,
  getMoviesFailure,
  onUpdateMovie,
  onDeleteMovie,
  getUserMoviesSuccess,
  getUserMoviesFailure
}
