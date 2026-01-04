const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const authController = {
  login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email és jelszó szükséges.",
      });
    }

    User.findByEmail(email, (err, user) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ success: false, message: "Szerver hiba." });
      }

      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: "Helytelen adatok." });
      }

      bcrypt.compare(password, user.password_hash, (err, match) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ success: false, message: "Szerver hiba." });
        }

        if (!match) {
          return res
            .status(401)
            .json({ success: false, message: "Helytelen adatok." });
        }

        // Session beállítása
        req.session.user = {
          id: user.id,
          name: user.name,
          role: user.role,
          email: user.email,
        };

        let redirect = "/";
        if (user.role === "admin") redirect = "/admin";
        if (user.role === "guard") redirect = "/guard";

        return res.json({
          success: true,
          message: "Sikeres bejelentkezés.",
          redirect,
        });
      });
    });
  },

  logout(req, res) {
    req.session.destroy(() => {
      res.json({
        success: true,
        message: "Sikeres kijelentkezés.",
        redirect: "/",
      });
    });
  },

  me(req, res) {
    if (!req.session || !req.session.user) {
      return res.status(200).json({ loggedIn: false });
    }
    return res.json({
      loggedIn: true,
      user: req.session.user,
    });
  },
};

module.exports = authController;
