const express = require('express');
const router = express.Router();
const GameRoom = require('../models/GameRoom');

// Create game room
router.post('/start', async (req, res) => {
  try {
    const { roomName } = req.body;
    const newGameRoom = new GameRoom({ name: roomName });
    await newGameRoom.save();
    res.status(201).json({ gameId: newGameRoom._id, message: 'Game room created' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Join game room
router.post('/join', async (req, res) => {
  try {
    const { roomId } = req.body;
    const gameRoom = await GameRoom.findById(roomId);
    if (!gameRoom) {
      return res.status(404).json({ message: 'Game room not found' });
    }
    res.status(200).json({ message: 'Joined game room successfully', gameRoom });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Start game
router.post('/startGame', async (req, res) => {
  try {
    const { gameId } = req.body;
    const gameRoom = await GameRoom.findById(gameId);
    if (!gameRoom) {
      return res.status(404).json({ message: 'Game room not found' });
    }
    // Initialize game state here
    gameRoom.gameState = { /* initial state */ };
    await gameRoom.save();
    res.status(200).json(gameRoom.gameState);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Play turn
router.post('/play', async (req, res) => {
  try {
    const { gameId, playerId, action } = req.body;
    const gameRoom = await GameRoom.findById(gameId);
    if (!gameRoom) {
      return res.status(404).json({ message: 'Game room not found' });
    }
    // Update game state based on the action
    // gameRoom.gameState = updatedState;
    await gameRoom.save();
    res.status(200).json(gameRoom.gameState);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
