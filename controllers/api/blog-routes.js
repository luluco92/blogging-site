const router = require('express').Router();
const Blog = require('../../models/Blog');
const Comment = require('../../models/Comment');

// route to create/add a blog using async/await
router.post('/', async (req, res) => {
  try { 
    const x = await Blog.create({
    title: req.body.title,
    content: req.body.content,
    user_id: req.session.user_id,
  });
  // if the blog is successfully created, the new response will be returned as json
  res.status(200).json(x)
} catch (err) {
  res.status(400).json(err);
}
});

// PUT route for specific ID
router.put('/:id', async (req, res) => {
  try {
    const x = await Blog.update(
    {
      title: req.body.title,
      content: req.body.content,
    },
    {
      where: {
        id: req.params.id,
      },
    });

    if (!x) {
      res.status(404).json({ message: 'Blog not found.' });
      return;
    }

    // if successful returns the data that it updated to
    res.status(200).json(x);
  } catch (err) {
      res.status(500).json(err);
    };
});

// DELETE route
router.delete('/:id', async (req, res) => {
   try {
    const x = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!x) {
      res.status(404).json({ message: 'Blog not found.' });
      return;
    }

    res.status(200).json(x);
  } catch (err) {
    res.status(500).json(err);
  }

});

// route to create/add a comment using async/await
router.post('/:id', async (req, res) => {
 // check login and whether the blog exists. also check login/correct user for editing for all routes.
  try { 
const x = await Blog.findByPk(req.params.id);
  if(!x) {
          res.status(404).json({message: 'Blog not found.'});
          return;
         }

    xx = await Comment.create({
    content: req.body.content,
    blog_id: req.params.id,
    user_id: req.session.user_id,
  });
  // if the comment is successfully created, the new response will be returned as json
  res.status(200).json(xx)
} catch (err) {
  res.status(400).json(err);
}
});

module.exports = router;
