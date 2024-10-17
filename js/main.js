const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const names = ['Артём', 'Кристина', 'Михаил', 'Мария', 'Олег', 'Вера', 'Наталья', 'Дмитрий', 'Аня', 'Евгений'];

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createComment(id) {
  const message = messages[getRandomInt(0, messages.length - 1)];
  const name = names[getRandomInt(0, names.length - 1)];
  const avatar = `img/avatar-${getRandomInt(1, 6)}.svg`;

  return {
    id: id,
    avatar: avatar,
    message: message,
    name: name
  };
}

function createComments() {
  const commentsCount = getRandomInt(0, 30);
  const comments = [];

  for (let i = 0; i < commentsCount; i++) {
    comments.push(createComment(getRandomInt(100, 999)));
  }

  return comments;
}

function createPhoto(id) {
  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: `Описание фотографии ${id}`,
    likes: getRandomInt(15, 200),
    comments: createComments()
  };
}

function createPhotosArray() {
  const photos = [];

  for (let i = 1; i <= 25; i++) {
    photos.push(createPhoto(i));
  }

  return photos;
}

const photosArray = createPhotosArray();
// eslint-disable-next-line no-console
console.log(photosArray);
