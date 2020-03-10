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


//Custom MiddleWare

function validatePostId() {
  return (req, res, next) => {
    posts.getById(req.params.id)
    .then((post) => {
      if(post) {
        req.post = post
        next()
      } else {
        res.status(400).json({message: "invalid post id"})
      }
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = router;
