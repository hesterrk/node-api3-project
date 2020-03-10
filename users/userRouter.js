const express = require("express");
const users = require("./userDb");
const posts = require("../posts/postDb");
const router = express.Router();

//posting new user
router.post("/", validateUser(), (req, res, next) => {
  users
    .insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      next(err);
    });
});

//posting a new post for a specific user 
router.post("/:id/posts", validateUserId(), validatePost(),(req, res, next) => {
const objectToSend = { text: req.body.text, user_id: req.params.id }

posts.insert(objectToSend)
.then(post => {
  res.status(201).json(post)
})
.catch(err => {
  next(err)
})

});


router.get("/", (req, res, next) => {
  // res.send('Hello this works')
  users
    .get()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      next(err);
    });
});

router.get("/:id", validateUserId(), (req, res) => {
res.status(200).json(req.user);

});


router.get("/:id/posts", validateUserId(), (req, res, next) => {

  users.getUserPosts(req.params.id)
  .then(posts => {
    res.status(200).json(posts);
  })
  .catch(err => {
    next(err);
  })

});


router.delete("/:id", validateUserId(), (req, res, next) => {
  users.remove(req.params.id)
  .then(count => {
    if (count > 0) {
      res.status(200).json({ message: 'The user has been deleted' });
    } else {
      res.status(404).json({ message: 'The user could not be found' });
    }
  })
  .catch(error => {
    next(error)
  });



});

//changing user info 
router.put("/:id", validateUserId(), validateUser(), (req, res, next) => {
users.update(req.params.id, req.body)
.then(user => {
    res.status(200).json(user);  
})
.catch(error => {
  next(error)
});

});


//Custom validation MiddleWare functions:

function validateUserId() {
  // if the `id` parameter is valid, store that user object as `req.user`
  // if the `id` parameter does not match any user id in the database, cancel the request and respond with status `400` and `{ message: "invalid user id" }`
return (req, res, next) => {
  users.getById(req.params.id)
  .then((user) => {
    if(user) {
      req.user = user
      next()
    } else {
      res.status(400).json({message: "invalid user id"})
    }
  })
  .catch(err => {
    next(err)
  })
}

}

function validatePost() {
  return (req, res, next) => {
    if(!req.body) {
       res.status(400).json({message: "missing post data"})
    }
    else if(!req.body.text) {
       res.status(400).json({message: "missing required text field" })

    }
    else {
    next()
    }
  };

}

function validateUser() {
  return (req, res, next) => {
    if (!req.body.name) {
      return res.status(400).json({ message: "missing required name field" });
    } else if (!req.body) {
      return res.status(400).json({ message: "missing user data" });
    }
    next();
  };
}

module.exports = router;
