const router = require('express').Router();

const playerController = require('../controller/player.controller')

router.get('/', playerController.readPlayers);

router.get('/create', (req, res) => res.render('creatingPlayer'));

router.post('/create', playerController.createPlayer);

router.get("/:id", playerController.editPlayer);

router.post("/:id", playerController.savePlayer);

module.exports = router;