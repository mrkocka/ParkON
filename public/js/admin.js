const btn = document.getElementById("create-guard-btn");
const msg = document.getElementById("guard-message");

btn.addEventListener("click", async () => {
  msg.textContent = "";

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!name || !email || !password) {
    msg.textContent = "Minden mező kitöltése kötelező.";
    return;
  }

  try {
    const res = await fetch("/api/admin/create-guard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    msg.textContent = data.message;
    msg.style.color = data.success ? "green" : "red";

    if (data.success) {
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("password").value = "";
    }
  } catch (err) {
    console.error(err);
    msg.textContent = "Szerver hiba.";
    msg.style.color = "red";
  }
});
