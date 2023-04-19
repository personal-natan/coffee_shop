const { sign, verify } = require("jsonwebtoken");
const passport = require("passport");
const BearerStrategy = require("passport-http-bearer").Strategy;
const { JWT_SECRET } = process.env;

const JWT_EXPIRES = "1d";

function signJwt(payload) {
  const token = sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
  return token;
}

passport.use(
  new BearerStrategy(function (token, done) {
    verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false);
      return done(null, user, token);
    });
  })
);

function passportStrategy(req, res, next) {
  passport.authenticate("bearer", function (err, user, info, status) {
    if (err) return next(err);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    next();
  })(req, res, next);
}

module.exports = {
  signJwt,
  passport,
  passportStrategy,
};
