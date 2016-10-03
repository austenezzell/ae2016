import notify from 'gulp-notify';

export const plumberConfig = {
  errorHandler: notify.onError('Error: <%= error.message %>'),
};
