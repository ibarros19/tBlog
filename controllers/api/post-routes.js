const router = require("express").Router();
const { Post, Comment, User } = require("../../models/");
const authenticated = require("../../utils/auth");

router.post("/", authenticated, async (req, res) => {
  const body = req.body;
  try {
    const post = await Post.create({ ...body, userId: req.session.userId })
    res.json(post);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", authenticated, async (req, res) => {
  try {
    const affectedRows = await Post.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    if (affectedRows > 0) {
      res.status(200).end();
    }
    else {
      res.status(404).end();
    }
  }
  catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", authenticated, async (req, res) => {
  try {
    const affectedRows = await Post.destroy({
      where: {
        id: req.params.id
      }
    })
    if (affectedRows > 0) {
      res.status(200).end();
    }
    else {
      res.status(404).end();
    }
  }
  catch (e) {
    res.status(500).json(err);
  }
});

module.exports = router;