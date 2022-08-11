const express = require('express');
const router = express.Router();
const homecontrol = require('../controllers/homecontrol');

console.log("Router Loaded");
router.get('/data',homecontrol.home);
router.post('/create-note',homecontrol.create_note);
router.get('/delete-note',homecontrol.delete_note);


module.exports = router;