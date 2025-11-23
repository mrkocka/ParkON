const form = document.getElementById("login-form");
const errorEl = document.getElementById("error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorEl.textContent = "";

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!data.success) {
      errorEl.textContent = data.message || "Sikertelen bejelentkezés.";
      return;
    }

    // Siker esetén átirányítás az API által megadott URL-re
    window.location.href = data.redirect;
  } catch (err) {
    console.error(err);
    errorEl.textContent = "Hálózati hiba.";
  }
});
