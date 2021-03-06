module.exports = (app) => {
  const mongoose = require('mongoose');

  mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify:false
  });
  var db = mongoose.connection;
  db.once('open', function () {
    console.log('数据库连接成功');
  });
  db.once('error', function () {
    console.log('数据库连接失败');
  });
};
