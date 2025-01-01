import { isEscape } from './util.js';
const COMMENTS_BATCH_SIZE = 5;
const bigPictureContainer = document.querySelector('.big-picture');
const closeButtonElement = document.querySelector('.big-picture__cancel');
const bigPictureImage = document.querySelector('.big-picture__img').querySelector('img');
const likesCountElement = document.querySelector('.likes-count');
const captionElement = document.querySelector('.social__caption');
const commentsListElement = document.querySelector('.social__comments');
const commentItemTemplate = document.querySelector('.social__comment');
const loadMoreCommentsButton = document.querySelector('.comments-loader');
const commentsCounterElement = document.querySelector('.social__comment-count');
let selectedPhoto;
let currentCommentBatchIndex = 0;

const clearComments = () => {
  commentsListElement.innerHTML = '';
};

const createComment = (comment) => {
  const newComment = commentItemTemplate.cloneNode(true);
  const userAvatar = newComment.querySelector('.social__picture');
  userAvatar.src = comment.avatar;
  userAvatar.alt = comment.name;
  newComment.querySelector('.social__text').textContent = comment.message;
  return newComment;
};

const displayComments = () => {
  let lastIndex = 0;
  for (let i = currentCommentBatchIndex; i < currentCommentBatchIndex + COMMENTS_BATCH_SIZE; i++) {
    if (i === selectedPhoto.comments.length) {
      loadMoreCommentsButton.classList.add('hidden');
      lastIndex = i - 1;
      break;
    }
    lastIndex = i;
    commentsListElement.appendChild(createComment(selectedPhoto.comments[i]));
  }
  currentCommentBatchIndex = lastIndex + 1;
  commentsCounterElement.innerHTML = `${currentCommentBatchIndex} из <span class="comments-count">${selectedPhoto.comments.length}</span> комментариев`;
};

const updatePhoto = () => {
  bigPictureImage.src = selectedPhoto.url;
  likesCountElement.textContent = selectedPhoto.likes;
  captionElement.textContent = selectedPhoto.description;
  clearComments();
  currentCommentBatchIndex = 0;
  displayComments();
};

const onKeyDown = (evt) => {
  if (isEscape(evt)) {
    evt.preventDefault();
    closeBigPost();
  }
};

const onCloseButtonClick = () => closeBigPost();
const onLoadMoreCommentsClick = () => displayComments();

const openBigPicture = (post) => {
  bigPictureContainer.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onKeyDown);
  closeButtonElement.addEventListener('click', onCloseButtonClick);
  loadMoreCommentsButton.addEventListener('click', onLoadMoreCommentsClick);
  selectedPhoto = post;
  updatePhoto();
};

function closeBigPost() {
  bigPictureContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  loadMoreCommentsButton.classList.remove('hidden');
  document.removeEventListener('keydown', onKeyDown);
  closeButtonElement.removeEventListener('click', onCloseButtonClick);
  loadMoreCommentsButton.removeEventListener('click', onLoadMoreCommentsClick);
  currentCommentBatchIndex = 0;
}

export { openBigPicture };
