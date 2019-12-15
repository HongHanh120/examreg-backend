const roomModel = require('./models/database/rooms.database');

roomModel.getAllRoom()
    .then(console.log);
