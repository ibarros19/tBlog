const router = require("express").Router();
const { Comment } = require("../../models/");
const authenticated = require("../../utils/auth");

router.post("/", authenticated, (req, res) => {
  Comment.create({ ...req.body, userId: req.session.userId })
    .then(newComment => {
      res.json(newComment);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put("/:id", authenticated, async (req, res) => {
  try {
    const affectedRows = await Comment.update(req.body, {
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
    const affectedRows = await Comment.destroy({
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