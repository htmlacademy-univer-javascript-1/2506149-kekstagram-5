const bigPictureElement = document.querySelector('.big-picture');
const bodyElement = document.body;
const bigPictureImg = bigPictureElement.querySelector('.big-picture__img img');
const likesCount = bigPictureElement.querySelector('.likes-count');
const commentsCount = bigPictureElement.querySelector('.comments-count');
const socialCaption = bigPictureElement.querySelector('.social__caption');
const loadCommentsButton = bigPictureElement.querySelector('.comments-loader');
const commentsList = bigPictureElement.querySelector('.social__comments');
const commentTemplate = commentsList.querySelector('.social__comment');
const commentsCountData = bigPictureElement.querySelector('.social__comment-count');
const COMMENTS_STEP = 5;
let displayCommentsCount = 0;
let allComments = [];

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
};
const onEscKeyPress = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
    document.removeEventListener('keydown', onEscKeyPress);
  }
};

const createCommentItem = (comment) => {
  const commentElement = commentTemplate.cloneNode(true);
  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;
  return commentElement;
};
const displayComments = () => {
  commentsList.innerHTML = '';
  const commentsFragment = document.createDocumentFragment();
  displayCommentsCount = Math.min(displayCommentsCount, allComments.length);
  const commentsToDisplay = allComments.slice(0, displayCommentsCount);
  commentsCountData.innerHTML = `${displayCommentsCount} из <span class="comments-count">${allComments.length}</span> комментариев`;
  if (allComments.length <= COMMENTS_STEP || displayCommentsCount >= allComments.length) {
    loadCommentsButton.classList.add('hidden');
  } else {
    loadCommentsButton.classList.remove('hidden');
  }
  commentsToDisplay.forEach((comment) => {
    commentsFragment.appendChild(createCommentItem(comment));
  });
  commentsList.appendChild(commentsFragment);
};
const onLoadMoreCommentsClick = () => {
  displayCommentsCount += COMMENTS_STEP;
  displayComments();
};

const openBigPicture = (photo) => {
  bigPictureImg.src = photo.url;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;
  allComments = photo.comments.slice();
  displayCommentsCount = Math.min(COMMENTS_STEP, allComments.length);
  displayComments();
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyPress);
  bigPictureElement.querySelector('.big-picture__cancel').addEventListener('click', closeBigPicture);
  loadCommentsButton.addEventListener('click', onLoadMoreCommentsClick);
};
export{ openBigPicture };
