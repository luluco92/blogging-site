const router = require('express').Router();
const { User, Blog } = require('../models');

// GET all blogs for homepage (broke (unknown column user.user_id)
router.get('/', async (req, res) => {
  try {
    const x = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['user_id', 'username'],
        },
      ],
    });
console.log(x)
    const xx = x.map((i) =>
      i.get({ plain: true })
    );
console.log(xx)
    res.render('home', {
      xx,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one user and all their blogs
router.get('/user/:id', async (req, res) => {
  try {
    const x = await User.findByPk(req.params.id, {
      include: [
        {
          model: Blog,
          attributes: [
            'id',
            'title',
            'content',
            'user_id',
          ],
        },
      ],
    });
console.log(x)
    const xx = x.get({ plain: true });
console.log(xx)
    res.render('user', { xx });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one blog 
router.get('/blog/:id', async (req, res) => {
  try {
    const x = await Blog.findByPk(req.params.id);
    const xx = x.get({ plain: true });
    res.render('blog', { xx });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
