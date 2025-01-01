import {renderThumbnails} from './photos.js';
import { getData } from './api.js';
import { showAlert } from './util.js';
import { onSetupUserFormSubmit, resetFormAndCloseModal } from'./form_upload.js';
import './filter_for_photos.js';

getData()
  .then((photos) => {
    renderThumbnails(photos);
  })
  .catch((error) => {
    showAlert(error.message);
  });
onSetupUserFormSubmit(resetFormAndCloseModal);
