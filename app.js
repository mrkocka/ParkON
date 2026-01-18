const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();

const adminRoutes = require("./src/routes/adminRoutes");

// DB inicializálás (csak hogy létrejöjjön a tábla)
require("./src/models/db");

const authRoutes = require("./src/routes/authRoutes");
const {
  isLoggedIn,
  isAdmin,
  isGuard,
} = require("./src/middleware/authMiddleware");

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session
app.use(
  session({
    secret: "nagyon_titkos_parkon_kulcs", // ezt majd .env-be
    resave: false,
    saveUninitialized: false,
  })
);

// Static assets (css, js)
app.use('/assets', express.static(path.join(__dirname, 'public')));

// API route-ok
app.use("/api", authRoutes);
app.use("/api/admin", adminRoutes);

// Oldal route-ok (HTML-ek kiszolgálása)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "login.html"));
});

//Publikus foglaltság mérő elérése 
app.get("/public", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "public.html"));
});


// Admin felület – védett
app.get("/admin", isLoggedIn, isAdmin, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "admin.html"));
});

// Guard felület – védett
app.get("/guard", isLoggedIn, isGuard, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "guard.html"));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`ParkON szerver fut: http://localhost:${PORT}`);
});
