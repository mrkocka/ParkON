const db = require("./db");

const User = {
  findByEmail(email, callback) {
    db.get("SELECT * FROM users WHERE email = ?", [email], callback);
  },
};

module.exports = User;
