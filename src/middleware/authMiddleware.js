function isLoggedIn(req, res, next) {
  if (req.session && req.session.user) {
    return next();
  }
  // Ha nincs bejelentkezve, menjen a login oldalra
  return res.redirect("/login.html");
}

function isAdmin(req, res, next) {
  if (req.session && req.session.user && req.session.user.role === "admin") {
    return next();
  }
  return res.status(403).send("Hozzáférés megtagadva.");
}

function isGuard(req, res, next) {
  if (req.session && req.session.user && req.session.user.role === "guard") {
    return next();
  }
  return res.status(403).send("Hozzáférés megtagadva.");
}

module.exports = {
  isLoggedIn,
  isAdmin,
  isGuard,
};
