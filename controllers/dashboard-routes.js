const router = require("express").Router();
const { Post, Comment } = require("../models");
const authenticated = require("../utils/auth");

router.get("/", authenticated, (req, res) => {
  Post.findAll({
    where: {
      userId: req.session.userId
    }
  })
    .then(dbPostData => {
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      
      res.render("all-posts-admin", {
        layout: "dashboard",
        posts,
        session: req.session
      });
    })
    .catch(err => {
      console.log(err);
      res.redirect("login");
    });
});

router.get("/new", authenticated, (req, res) => {
  res.render("new-post", {
    layout: "dashboard",
    session: req.session
  });
});

router.get("/edit/:id", authenticated, (req, res) => {
  Post.findByPk(req.params.id)
    .then(dbPostData => {
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });
        
        res.render("edit-post", {
          layout: "dashboard",
          post,
          session: req.session
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get("/comment/edit/:id", authenticated, (req, res) => {
  Comment.findByPk(req.params.id)
    .then(data => {
      if (data) {
        const comment = data.get({ plain: true });
        
        res.render("edit-comment", {
          layout: "dashboard",
          comment,
          session: req.session
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;