const PART_SHOW_COMMNENT = 5;

const bodyElement = document.querySelector('body');
const fullSizePictureElement = bodyElement.querySelector('.big-picture');
const commentListElement = bodyElement.querySelector('.social__comments');
const commentElement = commentListElement.querySelector('.social__comment');
const cancelButtonElement = bodyElement.querySelector('.big-picture__cancel');
const commentFullCountElement = bodyElement.querySelector('.comments-count');
const commentsShownElement = bodyElement.querySelector('.show-comment');
const commentLoaderElement = bodyElement.querySelector('.comments-loader');

let showComment = 0;
let comments = [];

const createComment = ({ avatar, name, message }) => {
  const comment = commentElement.cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
};

const renderComments = () => {
  showComment += PART_SHOW_COMMNENT;

  if (showComment < comments.length) {
    commentLoaderElement.classList.remove('hidden');
  } else {
    showComment = comments.length;
    commentLoaderElement.classList.add('hidden');
  }

  commentListElement.innerHTML = '';

  for (let i = 0; i < showComment; i++) {
    const comment = createComment(comments[i]);
    commentListElement.appendChild(comment);
  }

  commentsShownElement.textContent = showComment;
  commentFullCountElement.textContent = comments.length;
};

function onCommentLoaderElementClick() {
  renderComments();
}

const renderPictureDetails = ({ url, likes, description }) => {
  fullSizePictureElement.querySelector('.big-picture__img img').src = url;
  fullSizePictureElement.querySelector('.big-picture__img').alt = description;
  fullSizePictureElement.querySelector('.social__caption').textContent = description;
  fullSizePictureElement.querySelector('.likes-count').textContent = likes;
};

export const showFullSizePicture = (data) => {
  fullSizePictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  commentLoaderElement.classList.add('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
  cancelButtonElement.addEventListener('click', onCancelButtonElementClick);
  commentLoaderElement.addEventListener('click', onCommentLoaderElementClick);
  renderPictureDetails(data);
  comments = data.comments.slice();
  renderComments();
};

const hideFullsizePicture = () => {
  fullSizePictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
  cancelButtonElement.removeEventListener('click', onCancelButtonElementClick);
  commentLoaderElement.removeEventListener('click', onCommentLoaderElementClick);
  showComment = 0;
};

function onCancelButtonElementClick() {
  hideFullsizePicture();
}

function onDocumentKeydown(event) {
  if (event.key === 'Escape') {
    event.preventDefault();
    hideFullsizePicture();
  }
}
