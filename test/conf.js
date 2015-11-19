exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  seleniumArgs: ['-browserTimeout=60'],
  specs: ['*-spec.js']
};