'use strict';

const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const PORT = 3000;
const HOST = '0.0.0.0';

const app = express();

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback'
        },
        (accessToken, refreshToken, profile, done) => {
            console.log('Access token', accessToken);
            console.log('Refresh token', refreshToken);
            console.log('Profile:', profile);
            console.log('Done', done);
        }
    ));

app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

app.get('/auth/google/callback', passport.authenticate('google'));

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);