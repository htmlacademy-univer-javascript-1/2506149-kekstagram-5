import {generatePhotos} from './data.js';
import {renderingThumbnails} from './photos.js';
import './upload-form.js';
renderingThumbnails(generatePhotos());
