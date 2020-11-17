export function getFilePath() {
  return process.env.FILES_UPLOAD_PATH + '/uploads/';
}

export function getFileName(req, file, callback) {
  const name = +new Date();
  const ext = file.originalname.split('.').pop();
  callback(null, `${name}.${ext}`);
}

export const validFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(csv|xlsx)$/)) {
    return callback(new Error('Only csv or xlsx files are allowed!'), false);
  }
  callback(null, true);
};

export const isExcelFile = (mimeType) => {
  return [
    'application/vnd.ms-excel', //xls,
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ].includes(mimeType);
};

const REQUIRED_FIELDS = ['name', 'age', 'gender'];

export const isValidRowInfo = (rowInfo) => {
  return (
    REQUIRED_FIELDS.length ===
    REQUIRED_FIELDS.filter((cur) => {
      return rowInfo[cur];
    }).length
  );
};
