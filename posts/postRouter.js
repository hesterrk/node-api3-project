const express = require('express');

const router = express.Router();

//MOVE ALL THE POST ROUTES IN USER INTO HERE 
//MAKE THESE A SUB-ROUTER ON THE USER ROUTER

router.get('/', (req, res) => {
  // do your magic!
});

router.get('/:id', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
}

module.exports = router;
