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
const editMovieFieldsView = require('../templates/updateMovieFields.handlebars')
const moviePostEvents = require('../moviePosts/events')

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
  const data = getFormFields(event.target)
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
  $('.cancel-create-new-movie-button').on('click', cancelCreateMovie)
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
//   $('.edit-movie-button').on('click', )
//   $('.delete-movie-button').on('click', )
// }
const cancelCreateMovie = () => {
  clearCreateInputFields()
  $('#content').empty()
}

const cancelUpdateMovie = () => {
  const currentMovieId = String($('#edit-movie-id-input').val())
  clearEditInputFields()
  $('#content').empty()
  renderMoviePage(currentMovieId)
}

const onOpenEditMovieFields = () => {
  event.preventDefault()
  const editMovieFieldsHTML = editMovieFieldsView()
  $('#content').empty()
  $('#content').append(editMovieFieldsHTML)
  $('.hide-movie-id').hide()
  // $('#edit-movie-modal').modal('show')
  const currentMovieId = $(event.target).attr('data-id')
  $('#edit-movie-id-input').val(currentMovieId)
  const currentMovieArray = store.movies.filter((movie) => {
    return String(movie.id) === currentMovieId
  })
  const currentMovie = currentMovieArray[0]

  // UPDATE EDIT FIELD VALUES |
  $('#edit-movie-title-input').val(currentMovie.title)
  $('#edit-movie-title-imdb-url-input').val(currentMovie.title_imdb_url)

  $('#edit-movie-director-input').val(currentMovie.director)
  $('#edit-movie-director-imdb-url-input').val(currentMovie.director_imdb_url)

  $('#edit-movie-writer-input').val(currentMovie.writer)
  $('#edit-movie-writer-imdb-url-input').val(currentMovie.writer_imdb_url)

  $('#edit-movie-cinematographer-input').val(currentMovie.cinematographer)
  $('#edit-movie-cinematographer-imdb-url-input').val(currentMovie.cinematographer_imdb_url)

  $('#edit-movie-composer-input').val(currentMovie.music)
  $('#edit-movie-composer-imdb-url-input').val(currentMovie.music_imdb_url)

  $('#edit-movie-title-rotten-url-input').val(currentMovie.title_rotten_url)
  $('#edit-movie-image-url-input').val(currentMovie.img_url)
  // SHOW EDIT MOVIE MODAL
  $('#edit-movie_params').on('submit', onUpdateMovie)
  $('.cancel-edit-movie-button').on('click', cancelUpdateMovie)
}

const clearCreateInputFields = () => {
  $('#edit-movie-input-title').val('')
  $('#edit-movie-input-title-imdb-url').val('')

  $('#edit-movie-input-director').val('')
  $('#edit-movie-input-director-imdb-url').val('')

  $('#edit-movie-input-writer').val('')
  $('#edit-movie-input-writer-imdb-url').val('')

  $('#edit-movie-input-cinematographer').val('')
  $('#edit-movie-input-title-imdb-url').val('')

  $('#edit-movie-input-music').val('')
  $('#edit-movie-input-music-imdb-url').val('')

  $('#edit-movie-title-rotten-url-input').val('')

  $('#edit-movie-input-img_url').val('')
}

const clearEditInputFields = () => {
  $('#update-movie-input-id').val('')

  $('#edit-movie-input-title').val('')
  $('#edit-movie-input-title-imdb-url').val('')

  $('#edit-movie-input-director').val('')
  $('#edit-movie-input-director-imdb-url').val('')

  $('#edit-movie-input-writer').val('')
  $('#edit-movie-input-writer-imdb-url').val('')

  $('#edit-movie-input-cinematographer').val('')
  $('#edit-movie-input-title-imdb-url').val('')

  $('#edit-movie-input-music').val('')
  $('#edit-movie-input-music-imdb-url').val('')

  $('#edit-movie-title-rotten-url-input').val('')

  $('#edit-movie-input-img_url').val('')
}

//
// [GET (ALL)] MOVIES | [GET (ALL)] MOVIES | [GET (ALL)] MOVIES | [GET (ALL)] MOVIES | [GET (ALL)] MOVIES | [GET (ALL)] MOVIES |
// [GET (ALL)] MOVIES | [GET (ALL)] MOVIES | [GET (ALL)] MOVIES | [GET (ALL)] MOVIES | [GET (ALL)] MOVIES | [GET (ALL)] MOVIES |
// [GET (ALL)] MOVIES | [GET (ALL)] MOVIES | [GET (ALL)] MOVIES | [GET (ALL)] MOVIES | [GET (ALL)] MOVIES | [GET (ALL)] MOVIES |
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

// [GET (USER)] MOVIES | [GET (USER)] MOVIES | [GET (USER)] MOVIES | [GET (USER)] MOVIES | [GET (USER)] MOVIES | [GET (USER)] MOVIES |
// [GET (USER)] MOVIES | [GET (USER)] MOVIES | [GET (USER)] MOVIES | [GET (USER)] MOVIES | [GET (USER)] MOVIES | [GET (USER)] MOVIES |
// [GET (USER)] MOVIES | [GET (USER)] MOVIES | [GET (USER)] MOVIES | [GET (USER)] MOVIES | [GET (USER)] MOVIES | [GET (USER)] MOVIES |
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
// [UPDATE] MOVIE | [UPDATE] MOVIE | [UPDATE] MOVIE | [UPDATE] MOVIE | [UPDATE] MOVIE | [UPDATE] MOVIE | [UPDATE] MOVIE | [UPDATE] MOVIE
// [UPDATE] MOVIE | [UPDATE] MOVIE | [UPDATE] MOVIE | [UPDATE] MOVIE | [UPDATE] MOVIE | [UPDATE] MOVIE | [UPDATE] MOVIE | [UPDATE] MOVIE
// [UPDATE] MOVIE | [UPDATE] MOVIE | [UPDATE] MOVIE | [UPDATE] MOVIE | [UPDATE] MOVIE | [UPDATE] MOVIE | [UPDATE] MOVIE | [UPDATE] MOVIE
const updateMovieSuccess = (data) => {
  clearEditInputFields()
  userAuthUi.userMessage('Movie Updated Successfully!')
  api.getMovies()
    .then((moviesData) => {
      store.movies = moviesData.movies
      $('#content').empty()
      renderMoviePage(String(data.movie.id))
    })
    .catch(getMoviesFailure)
}

const updateMovieFailure = (error) => {
  userAuthUi.userMessage('Failed to Update Movie!')
  console.error(error)
}

const onUpdateMovie = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  api.updateMovie(data)
    .then(updateMovieSuccess)
    .catch(updateMovieFailure)
}

//
// [DELETE] MOVIE | [DELETE] MOVIE | [DELETE] MOVIE | [DELETE] MOVIE | [DELETE] MOVIE | [DELETE] MOVIE | [DELETE] MOVIE | [DELETE] MOVIE |
// [DELETE] MOVIE | [DELETE] MOVIE | [DELETE] MOVIE | [DELETE] MOVIE | [DELETE] MOVIE | [DELETE] MOVIE | [DELETE] MOVIE | [DELETE] MOVIE |
// [DELETE] MOVIE | [DELETE] MOVIE | [DELETE] MOVIE | [DELETE] MOVIE | [DELETE] MOVIE | [DELETE] MOVIE | [DELETE] MOVIE | [DELETE] MOVIE |

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

}

const getMoviePostsFailure = (error) => {
  userAuthUi.userMessage('Failed to get Movie Posts!')
  console.error(error)
}

// const onNewComment = () => {
//   event.preventDefault()
//   const data = getFormFields(event.target)
//   if (data.movie_post.comment.trim()) {
//     moviePostApi.newMoviePost(data)
//       .then(ui.newMoviePostSuccess)
//       .catch(ui.newMoviePostFailure)
//
//   moviePostEvents.onNewMoviePost
// }

// [SHOW MOVIE PAGE] Mother of all Functions | [SHOW MOVIE PAGE] Mother of all Functions
// [SHOW MOVIE PAGE] Mother of all Functions | [SHOW MOVIE PAGE] Mother of all Functions
// [SHOW MOVIE PAGE] Mother of all Functions | [SHOW MOVIE PAGE] Mother of all Functions
// [SHOW MOVIE PAGE] Mother of all Functions | [SHOW MOVIE PAGE] Mother of all Functions
// [SHOW MOVIE PAGE] Mother of all Functions | [SHOW MOVIE PAGE] Mother of all Functions
// [SHOW MOVIE PAGE] Mother of all Functions | [SHOW MOVIE PAGE] Mother of all Functions
// [SHOW MOVIE PAGE] Mother of all Functions | [SHOW MOVIE PAGE] Mother of all Functions
// [SHOW MOVIE PAGE] Mother of all Functions | [SHOW MOVIE PAGE] Mother of all Functions
// [SHOW MOVIE PAGE] Mother of all Functions | [SHOW MOVIE PAGE] Mother of all Functions
// [SHOW MOVIE PAGE] Mother of all Functions | [SHOW MOVIE PAGE] Mother of all Functions
// [SHOW MOVIE PAGE] Mother of all Functions | [SHOW MOVIE PAGE] Mother of all Functions
// [SHOW MOVIE PAGE] Mother of all Functions | [SHOW MOVIE PAGE] Mother of all Functions
// this function gets movies from memory and stores both user movies and all movies
//
const showMoviePage = (event) => {
  event.preventDefault()
  const currentMovieId = $(event.target).attr('data-id')
  renderMoviePage(currentMovieId)
}

const renderMoviePage = (currentMovieId) => {
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
      // submit comment click handler
      $('.submit-comment-on-movie').on('submit', )
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
