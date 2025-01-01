const patternThumbnailsElement = document.querySelector('#picture').content.querySelector('.picture');
const childElementsElement = document.querySelector('.pictures');

const createThumbnail = ( {id, url, description, likes, comments} ) => {
  const thumbnail = patternThumbnailsElement.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.dataset.thumbnailId = id;

  return thumbnail;
};

const renderThumbnails = (pictures) =>{
  const element = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    element.append(thumbnail);
  });

  childElementsElement.append(element);
};

export { renderThumbnails };
