import express from 'express';
import passport from 'passport';

const router = express.Router();

// ✅ Google Login
router.get('/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

// ✅ Callback route
router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login', // adjust as needed
        session: true
    }),
    (req, res) => {
        res.redirect('/dashboard'); // or frontend route
    }
);

export default router;
