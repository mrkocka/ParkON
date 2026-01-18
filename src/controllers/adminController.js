const bcrypt = require("bcrypt");
const db = require("../models/db");

const adminController = {
  createGuard(req, res) {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      return res.status(400).json({
        success: false,
        message: "Minden mező kitöltése kötelező.",
      });
    }

    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          message: "Jelszó hashelési hiba.",
        });
      }

      db.run(
        "INSERT INTO users (email, name, password_hash, role) VALUES (?, ?, ?, ?)",
        [email, name, hash, "guard"],
        (err) => {
          if (err) {
            return res.status(400).json({
              success: false,
              message: "Ez az email már létezik.",
            });
          }

          return res.json({
            success: true,
            message: "Parkolóőr sikeresen létrehozva.",
          });
        },
      );
    });
  },
};

module.exports = adminController;
