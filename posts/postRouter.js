const express = require('express');
const posts = require('./postDb')

const router = express.Router();

//MOVE ALL THE POST ROUTES IN USER INTO HERE 
//MAKE THESE A SUB-ROUTER ON THE USER ROUTER

router.get('/', (req, res, next) => {
  posts.get()
  .then(post => {
    res.status(200).json(post)
  })
  .catch(err => {
    next(err);
  })


});

router.get('/:id', validatePostId(), (req, res) => {
  res.status(200).json(req.post)


});

router.delete('/:id', validatePostId(), (req, res, next) => {
  posts.remove(req.params.id)
  .then(count => {
    if(count > 0) {
      res.status(200).json({ message: 'The post has been deleted' });

    } else {
      res.status(404).json({ message: 'The post could not be found' });

    }
  })
  .catch(err => {
    next(err)
  })

});

router.put('/:id', validatePostId(), (req, res, next) => {
  posts.update(req.params.id, req.body)
  .then(post => {
    res.status(200).json(post);
  })
  .catch(err => {
    next(err)
  });

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
