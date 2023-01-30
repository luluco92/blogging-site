const router = require('express').Router();
const withAuth = require('../utils/auth');
const { User, Blog, Comment } = require('../models');

// GET all blogs for homepage
router.get('/', async (req, res) => {
  try {
    const x = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['id', 'username' ],
        },
      ],
    });
// serialize array of data
    const xx = x.map((i) => i.get({ plain: true }) ).reverse();
//  res.render('home', { xx });
    res.render('home', { xx, loggedIn: req.session.loggedIn, user_id: req.session.user_id });
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
            'updatedAt',
          ],
        },
      ],
    });
if(!x) {
          res.status(404).json({message: 'User not found.'});
          return;
      }

    const xx = x.get({ plain: true });
    xx.blogs.reverse();
//  res.render('user', { xx });
    res.render('user', { xx, loggedIn: req.session.loggedIn, user_id: req.session.user_id });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one blog 
router.get('/blog/:id', async (req, res) => {
  try {
    const x = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['id', 'username' ],
        },
        {
          model: Comment,
          attributes: ['content', 'user_id', 'updated_at' ],
        }
      ],
});
  if(!x) {
          res.status(404).json({message: 'Blog not found.'});
          return;
         }

    const xx = x.get({ plain: true });
    console.log(xx)
//  res.render('blog', { xx });
    res.render('blog', { xx, loggedIn: req.session.loggedIn, user_id: req.session.user_id });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/', { xx, loggedIn: req.session.loggedIn, user_id: req.session.user_id });
    return;
  }
  res.render('login');
});

// Signup route
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/', { loggedIn: req.session.loggedIn, user_id: req.session.user_id });
    return;
  }
  res.render('signup');
});

// GET my dashboard
router.get('/my', async (req, res) => {
if (!req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  try {
    const x = await User.findByPk(req.session.user_id, {
      include: [
        {
          model: Blog,
          attributes: [
            'id',
            'title',
            'content',
            'updatedAt',
          ],
        },
      ],
    });
if(!x) {
          res.status(404).json({message: 'User not found.'});
          return;
      }
    const xx = x.get({ plain: true });
    xx.blogs.reverse();
    res.render('my', { xx, loggedIn: req.session.loggedIn, user_id: req.session.user_id });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET add blog form
router.get('/addblog', withAuth, (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/');
    return;
  }
    res.render('addblog', { loggedIn: req.session.loggedIn, user_id: req.session.user_id });
});

// GET edit blog form
router.get('/editblog/:id', async (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  try {
    const x = await Blog.findByPk(req.params.id, {
/*      include: [
        {
          model: User,
          attributes: ['id'],
        },
      ],*/
  });
  if(!x) {
          res.status(404).json({message: 'Blog not found.'});
          return;
         }

  const xx = x.get({ plain: true });

  if (req.session.user_id !== xx.user_id) {
    res.redirect('/');
    return;
  }

    res.render('editblog', { xx, loggedIn: req.session.loggedIn, user_id: req.session.user_id });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Redirect all other routes to homepage
router.get("*", (req, res) => {
    res.redirect('/');
    return;
});


module.exports = router;
