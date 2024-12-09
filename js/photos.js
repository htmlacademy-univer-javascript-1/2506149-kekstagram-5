import {openBigPicture} from './bigpicture.js';
export function renderingThumbnails(photos){
  const pictureList = document.querySelector('.pictures');
  const pictureFragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const picture = document.querySelector('#picture').content;
    const pictureElement = picture.cloneNode(true);
    const img = pictureElement.querySelector('.picture__img');

    img.src = photo.url;
    img.alt = photo.description;

    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.coments.length;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    img.addEventListener('click', () => openBigPicture(photo));
    pictureFragment.append(pictureElement);
  });
  pictureList.append(pictureFragment);
}
