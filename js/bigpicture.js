import { isEscape } from './util.js';
const COMMENTS_STEP = 5;
const bigPictureElement = document.querySelector('.big-picture');
const closeButton = document.querySelector('.big-picture__cancel');
const imageElement = document.querySelector('.big-picture__img').querySelector('img');
const bigPictureLikesCount = document.querySelector('.likes-count');
const socialCaptionElement = document.querySelector('.social__caption');
const commentsContainer = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('.social__comment');
const loadCommentsButton = document.querySelector('.comments-loader');
const commentsCountDisplay = document.querySelector('.social__comment-count');
let currentPhoto;
let currentCommentIndex = 0;
const clearComments = () => {
  commentsContainer.innerHTML = '';
};
const createComment = (comment) => {
  const newComment = commentTemplate.cloneNode(true);
  const userAvatar = newComment.querySelector('.social__picture');
  userAvatar.src = comment.avatar;
  userAvatar.alt = comment.name;
  newComment.querySelector('.social__text').textContent = comment.message;
  return newComment;
};
const displayComments = () => {
  let lastIndex = 0;
  for (let i = currentCommentIndex; i < currentCommentIndex + COMMENTS_STEP; i++) {
    if (i === currentPhoto.comments.length) {
      loadCommentsButton.classList.add('hidden');
      lastIndex = i - 1;
      break;
    }
    lastIndex = i;
    commentsContainer.appendChild(createComment(currentPhoto.comments[i]));
  }
  currentCommentIndex = lastIndex + 1;
  commentsCountDisplay.innerHTML = `${currentCommentIndex} из <span class="comments-count">${currentPhoto.comments.length}</span> комментариев`;
};
const updatePhoto = () => {
  imageElement.src = currentPhoto.url;
  bigPictureLikesCount.textContent = currentPhoto.likes;
  socialCaptionElement.textContent = currentPhoto.description;
  clearComments();
  currentCommentIndex = 0;
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
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onKeyDown);
  closeButton.addEventListener('click', onCloseButtonClick);
  loadCommentsButton.addEventListener('click', onLoadMoreCommentsClick);
  currentPhoto = post;
  updatePhoto();
};
function closeBigPost() {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  loadCommentsButton.classList.remove('hidden');
  document.removeEventListener('keydown', onKeyDown);
  closeButton.removeEventListener('click', onCloseButtonClick);
  loadCommentsButton.removeEventListener('click', onLoadMoreCommentsClick);
  currentCommentIndex = 0;
}
export { openBigPicture };
