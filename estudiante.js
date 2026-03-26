// VERIFICAR LOGIN
if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "index.html";
}

// CARGAR DATOS
const nombre = localStorage.getItem("userName") || "Usuario";
const email = localStorage.getItem("userEmail") || "";

document.getElementById("nombre").textContent = nombre;
document.getElementById("perfilNombre").textContent = nombre;
document.getElementById("perfilEmail").textContent = email;
document.getElementById("userName").textContent = "👨‍🎓 " + nombre;

// LOGOUT
function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}