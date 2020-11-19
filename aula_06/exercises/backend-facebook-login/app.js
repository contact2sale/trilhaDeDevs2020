const express = require("express"),
  passport = require("passport"),
  FacebookStrategy = require("passport-facebook").Strategy,
  session = require("express-session"),
  cookieParser = require("cookie-parser"),
  bodyParser = require("body-parser"),
  config = require("./configuration/config"),
  app = express();

// Passport session setup.
passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

// Use the FacebookStrategy within Passport.

passport.use(
  new FacebookStrategy(
    {
      clientID: config.facebook_api_key,
      clientSecret: config.facebook_api_secret,
      callbackURL: config.callback_url,
    },
    function (accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        //Check whether the User exists or not using profile.id
        return done(null, profile);
      });
    }
  )
);

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: "secret_key", key: "sid" }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.render("index", { user: req.user });
});

app.get("/account", ensureAuthenticated, function (req, res) {
  res.render("account", { user: req.user });
});

app.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: "email" })
);

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
  function (req, res) {
    res.redirect("/");
  }
);

app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

app.listen(4000);
