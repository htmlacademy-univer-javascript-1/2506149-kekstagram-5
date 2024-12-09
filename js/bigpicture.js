const bigPictureElement = document.querySelector('.big-picture');
const bodyElement = document.body;
const bigPictureImg = bigPictureElement.querySelector('.big-picture__img');
const likesCount = bigPictureElement.querySelector('.likes-count');
const commentsCount = bigPictureElement.querySelector('.comments-count');
const socialCaption = bigPictureElement.querySelector('.social__caption');
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
const openBigPicture = (photo) => {
  bigPictureImg.src = photo.url;
  likesCount.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;
  const commentsContainer = bigPictureElement.querySelector('.social__comments');
  commentsContainer.innerHTML = '';
  photo.comments.forEach((comment) => {
    const commentElement = document.createElement('li');
    commentElement.classList.add('social__comment');
    commentElement.innerHTML = `<img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
            <p class="social__text">${comment.message}</p>`;
    commentsContainer.append(commentElement);
  });
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  bigPictureElement.querySelector('.social__comment-count').classList.add('hidden');
  bigPictureElement.querySelector('.comments-loader').classList.add('hidden');
  document.addEventListener('keydown', onEscKeyPress);
  bigPictureElement.querySelector('.big-picture__cancel').addEventListener('click', closeBigPicture);
};
export{ openBigPicture };
