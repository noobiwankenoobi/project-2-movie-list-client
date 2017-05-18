'use strict'

const store = require('../store.js')
const showMoviePostsTemplate = require('../templates/moviePosts.handlebars')
const api = require('./api')
const getFormFields = require('../../../lib/get-form-fields')
const userAuthUi = require('../userAuth/ui.js')

// [GET ALL] MOVIES
// [GET ALL] MOVIES

const getMoviePostsSuccess = (data) => {
  userAuthUi.userMessage('Found Some Movie Posts!')
  store.moviePosts = data.movie_posts
  refreshMoviePostsTable()
}

const getMoviePostsSuccessQuiet = (data) => {
  store.moviePosts = data.movie_posts
  refreshMoviePostsTable()
}

const getMoviePostsFailure = (error) => {
  userAuthUi.userMessage('Failed to get Movie Posts!')
  console.error(error)
}

// HELPER FUNCTIONS FOR REFRESHING
// HELPER FUNCTIONS FOR REFRESHING

const refreshMoviePostsData = () => {
  api.getMoviePosts()
    .then(getMoviePostsSuccessQuiet)
    .catch(getMoviePostsFailure)
}

const clearUpdateInputFields = () => {
  $('#update-post-input-id').val('')
  $('#update-post-input-movie-title').val('')
  $('#update-post-input-director').val('')
  $('#update-post-input-comment').val('')
}

// [UPDATE] MOVIE POST
// [UPDATE] MOVIE POST

const updateMoviePostSuccess = () => {
  userAuthUi.userMessage('Movie Post Updated Successfully!')
  refreshMoviePostsData()
  clearUpdateInputFields()
  $('.update-field').hide()
}

const updateMoviePostFailure = (error) => {
  userAuthUi.userMessage('Failed to Update Movie Post!')
  console.error(error)
}

const updateMoviePost = (event) => {
  event.preventDefault()
  const data = getFormFields(event.target)
  refreshMoviePostsTable()
  if (data.movie_post.comment.trim()) {
    api.updateMoviePost(data)
      .then(updateMoviePostSuccess)
      .catch(updateMoviePostFailure)
  } else {
    userAuthUi.userMessage('You Must Enter a Comment')
  }
}

const showUpdateFields = (event) => {
  event.preventDefault()
  const currentPostId = $(event.target).attr('data-id')
  $('#update-post-input-id').val(currentPostId)
  const currentPostArray = store.moviePosts.filter((moviePost) => {
    return String(moviePost.id) === currentPostId
  })
  const currentPost = currentPostArray[0]

// UPDATE FIELD VALS
  $('#update-post-input-movie-title').val(currentPost.title)
  $('#update-post-input-director').val(currentPost.director)
  $('#update-post-input-comment').val(currentPost.comment)

// SHOW / HIDE
  $('.update-field').show()
  $('#update-id-div').hide()

  $('#update-movie-post-input-forms').on('submit', updateMoviePost)
  $('#cancel-update-submit-button').on('click', () => { $('.update-field').hide() })
}

// REFRESH TABLE
// REFRESH TABLE

const refreshMoviePostsTable = () => {
  const showMoviePostsHtml = showMoviePostsTemplate({ moviePosts: store.moviePosts })
  $('#content').empty()
  $('#content').append(showMoviePostsHtml)
  $('.edit-movie-button').on('click', showUpdateFields)
  $('.delete-movie-post').on('click', deleteMoviePost)
}

// [DELETE] MOVIE POST
// [DELETE] MOVIE POST

const deleteMoviePostSuccess = () => {
  userAuthUi.userMessage('Movie Post Deleted!')
  refreshMoviePostsData()
}

const deleteMoviePostFailure = (error) => {
  userAuthUi.userMessage('Failed to Delete Movie Post!')
  console.error(error)
}

const deleteMoviePost = (event) => {
  event.preventDefault()
  const moviePostId = $(event.target).attr('data-id')
  store.moviePosts = store.moviePosts.filter((moviePost) => {
    return String(moviePost.id) !== String(moviePostId)
  })
  refreshMoviePostsTable()
  api.deleteMoviePost(moviePostId)
    .then(deleteMoviePostSuccess)
    .catch(deleteMoviePostFailure)
}

// [CREATE] NEW MOVIE POST
// [CREATE] NEW MOVIE POST

const newMoviePostSuccess = () => {
  userAuthUi.userMessage('Added New Movie Post!')
  refreshMoviePostsData()
  $('#create-new-movie-post-input-forms').val('')
  $('#form-fields-handlebars-insert').empty()
}

const newMoviePostFailure = (error) => {
  userAuthUi.userMessage('Failed to add New Movie Post!')
  console.error(error)
}

module.exports = {
  newMoviePostSuccess,
  newMoviePostFailure,
  getMoviePostsSuccess,
  getMoviePostsFailure,
  updateMoviePost
}
