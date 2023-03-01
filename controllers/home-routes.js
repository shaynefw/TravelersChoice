// Import middlewares and models
const router = require('express').Router();
const { User, Country, Review } = require('../models');
const withAuth = require('../utils/auth'); // Custom middleware for authentification


// GET for homepage ('/')
router.get('/', async (req, res) => {
  try {
    // const dbTopCountryData = await Review.findAll({
    //   group: ['country_id'],
    //   attributes: ['country_id', [sequelize.fn('COUNT', 'country_id'), 'count']],
    // });
    const dbTopCountryData = await sequelize.query("SELECT ROW_NUMBER() OVER(ORDER BY COUNT(country_id) DESC) top, country_id, COUNT(country_id), FROM review");
    const countriesTop = dbTopCountryData.map((country) => country.get({ plain: true }));
    const top1 = countriesTop[0].country_id;
    const top2 = countriesTop[1].country_id;
    const top3 = countriesTop[2].country_id;

    console.log(countriesTop); // FOR A TEST PURPOSE

    const dbReviewTop1Data = await Review.findAll({
      include: [{
        model: Country
      }],
      where: {
        country_id: top1,
      }, 
    });

    const dbReviewTop2Data = await Review.findAll({
      include: [{
        model: Country
      }],
      where: {
        country_id: top2,
      }, 
    });

    const dbReviewTop3Data = await Review.findAll({
      include: [{
        model: Country
      }],
      where: {
        country_id: top3,
      }, 
    });

    const reviewsTop1 = dbReviewTop1Data.map((review) => review.get({ plain: true }));
    const reviewsTop2 = dbReviewTop2Data.map((review) => review.get({ plain: true }));
    const reviewsTop3 = dbReviewTop3Data.map((review) => review.get({ plain: true }));

    console.log(reviewsTop1); // FOR A TEST PURPOSE
    console.log(reviewsTop2); // FOR A TEST PURPOSE
    console.log(reviewsTop3); // FOR A TEST PURPOSE

    res.render('homepage', { countriesTop, reviewsTop1, reviewsTop2, reviewsTop3, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET for country page ('/country/:id')
router.get('/country/:id', async (req, res) => {
  try {
    const dbReviewData = await Review.findAll({
      include: [{
        model: Country
      }],
      where: {
        country_id: req.params.id,
      }, 
    });
    const reviews = dbReviewData.map((review) => review.get({ plain: true }));
    res.render('country', { reviews, loggedIn: req.session.loggedIn});
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
    const dbReviewData = await Review.findAll({
      include: [{
        model: Country
      }],
      where: {
        user_id: req.session.user_id,
      },
    });
    const reviews = dbReviewData.map((review) => review.get({ plain: true }));
    res.render('dashboard', { reviews, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


// GET for create new review page ('/dashboard/review')
router.get('/dashboard/review', withAuth, (req, res) => { // withAuth: only if user is logged in, the callback function is executed
  res.render('create-review', { loggedIn: req.session.loggedIn });
});


// GET for edit review page ('/dashboard/review/:id')
router.get('/dashboard/review/:id', withAuth, async (req, res) => {  // withAuth: only if user is logged in, the callback function is executed
  try {
    const dbReviewData = await Review.findByPk(req.params.id, {});
    const review = dbReviewData.get({ plain: true });
    res.render('edit-review', { review, loggedIn: req.session.loggedIn });
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
