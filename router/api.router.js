const router = require('express').Router();

const playersRouter = require('./player.router');

router.use('/players', playersRouter);

module.exports = router;