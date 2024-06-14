const mongoose = require('mongoose');

const gameRoomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  gameState: {
    type: Object,
    default: {},
  }
});

const GameRoom = mongoose.model('GameRoom', gameRoomSchema);

module.exports = GameRoom;
