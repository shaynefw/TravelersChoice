// Import middlewares and models
const router = require('express').Router();
const { User, Country, Review } = require('../models');
const withAuth = require('../utils/auth'); // Custom middleware for authentification


// GET for homepage ('/')
router.get('/', async (req, res) => {
  try {
    const dbTopCountryData = await Review.findAll({
      include: [{
          model: User,
          attributes: ['username'],
        }],
    });
    const posts = dbPostData.map((post) => post.get({ plain: true }));
    res.render('homepage', { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET for country page ('/country/:id')
router.get('/country/:id', async (req, res) => {
  try {
    const dbPostData = await Post.findByPk(req.params.id, {
      include: [{
        model: Comment,
        include: [{
          model: User,
        }]
      }, { model: User }],
    });
    const post = dbPostData.get({ plain: true });
    res.render('post', { post, loggedIn: req.session.loggedIn, commenter: "Commenter" });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET for Review page ('/review/:id')  
// router.get('/review/:id', async (req, res) => {
//   try {
//     const dbPostData = await Post.findByPk(req.params.id, {
//       include: [{
//         model: Comment,
//         include: [{
//           model: User,
//         }]
//       }, { model: User }],
//     });
//     const post = dbPostData.get({ plain: true });
//     res.render('post', { post, loggedIn: req.session.loggedIn, commenter: "Commenter" });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json(err);
//   }
// });

// GET for dashboard page ('/dashboard')
router.get('/dashboard', withAuth, async (req, res) => { // withAuth: only if user is logged in, the callback function is executed
  try {
    const dbPostData = await Post.findAll({
      include: [{
        model: User,
        attributes: ['username'],
      }],
      where: {
        user_id: req.session.user_id,
      },
    });
    const posts = dbPostData.map((post) => post.get({ plain: true }));
    res.render('dashboard', { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// GET for create new review page ('/dashboard/review')
router.get('/dashboard/review', withAuth, (req, res) => { // withAuth: only if user is logged in, the callback function is executed
  res.render('newpost', { loggedIn: req.session.loggedIn });
});


// GET for edit review page ('/dashboard/review/:id')
router.get('/dashboard/review/:id', withAuth, async (req, res) => {  // withAuth: only if user is logged in, the callback function is executed
  try {
    const dbPostData = await Post.findByPk(req.params.id, {});
    const post = dbPostData.get({ plain: true });
    res.render('editpost', { post, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// GET for login page ('/login')
router.get('/login', (req, res) => {
  res.render('login', { loggedIn: req.session.loggedIn });
});


// GET for signup page ('/signup')
// router.get('/signup', (req, res) => {
//   res.render('signup', { loggedIn: req.session.loggedIn });
// });


module.exports = router;
