const cron = require('node-cron');
const pwsupload = require('./uploader')


const task = cron.schedule('* * * * *', () => {
  pwsupload.runPwsUpload();
}, {
  scheduled: false
});

task.start();