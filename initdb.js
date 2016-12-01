var models = require('./models');

models.sequelize.sync();
// var data = {
//   username: 'asd'
// }
// models.User.create(data);

models.User.getUserByUsename('asd',function(data){
  console.log(data);
});

// var data = {
//   user1: 'haha',
//   user2: 'hehe',
//   msg: 'hihi:mot,haha:hai,hihi:ba',
//   offlineMsg: 'hihi:bon,haha:nam,hihi:ba'
// }
// models.Msg.create(data);

// var query = {
//   where: {
//     user1: 'hihi'
//   }
// };
// models.Msg.findOne(query).then(function(msg){
//   console.log(msg);
// });


// models.Msg.getOfflineMsg('hehe','hjchjc', function(msg){
//   console.log(msg.offlineMsg);
// });

//models.Msg.saveOfflineMsg('hehe','hjchjc','testmes');
