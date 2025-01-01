import { openBigPicture } from './bigpicture.js';
const getPictureClick = (photos) => (evt) => {
  const pictureElement = evt.target.closest('.picture');
  if (pictureElement) {
    const currentPicture = photos.find((photo) =>
      photo.url === pictureElement.querySelector('.picture__img').getAttribute('src')
    );
    if (currentPicture) {
      openBigPicture(currentPicture);
    }
  }
};
export function renderThumbnails(photos){
  const pictureList = document.querySelector('.pictures');
  const pictureFragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const picture = document.querySelector('#picture').content;
    const pictureElement = picture.cloneNode(true);
    const img = pictureElement.querySelector('.picture__img');
    img.src = photo.url;
    img.alt = photo.description;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    pictureFragment.append(pictureElement);
  });
  pictureList.append(pictureFragment);
  pictureList.addEventListener('click', getPictureClick(photos));
}
