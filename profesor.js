// PROTEGER
if (localStorage.getItem("isLoggedIn") !== "true") {
    window.location.href = "index.html";
}

// DATOS USUARIO
const nombre = localStorage.getItem("userName");
document.getElementById("nombre").textContent = nombre;
document.getElementById("userName").textContent = "👨‍🏫 " + nombre;

// LOGOUT
function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}

// CURSOS
async function crearCurso() {
    let nombreCurso = document.getElementById("cursoNombre").value;

    if (!nombreCurso) return alert("Escribe un curso");

    try {
        await api.createCourse(nombreCurso);
        mostrarCursos();
        document.getElementById("cursoNombre").value = "";
    } catch (error) {
        alert("Error creando curso: " + error.message);
    }
}

async function mostrarCursos() {
    try {
        const courses = await api.getCourses();
        let html = "";

        courses.forEach(c => {
            html += `<div class="card">${c.name}</div>`;
        });

        document.getElementById("listaCursos").innerHTML = html;
    } catch (error) {
        console.error("Error cargando cursos:", error);
        // Fallback a localStorage
        let cursos = JSON.parse(localStorage.getItem("cursos")) || [];
        let html = "";
        cursos.forEach(c => {
            html += `<div class="card">${c}</div>`;
        });
        document.getElementById("listaCursos").innerHTML = html;
    }
}

// TAREAS
async function crearTarea() {
    let tarea = document.getElementById("tareaTexto").value;

    if (!tarea) return alert("Escribe una tarea");

    try {
        await api.createTask(tarea, "", null); // courseId null por ahora
        mostrarTareas();
        document.getElementById("tareaTexto").value = "";
    } catch (error) {
        alert("Error creando tarea: " + error.message);
    }
}

async function mostrarTareas() {
    try {
        const tasks = await api.getTasks();
        let html = "";

        tasks.forEach(t => {
            html += `<div class="card">${t.title}</div>`;
        });

        document.getElementById("listaTareas").innerHTML = html;
    } catch (error) {
        console.error("Error cargando tareas:", error);
        // Fallback
        let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
        let html = "";
        tareas.forEach(t => {
            html += `<div class="card">${t}</div>`;
        });
        document.getElementById("listaTareas").innerHTML = html;
    }
}

// ESTUDIANTES
async function mostrarEstudiantes() {
    try {
        const students = await api.getStudents();
        let html = "";

        students.forEach(u => {
            html += `<div class="card">${u.fullName}</div>`;
        });

        document.getElementById("listaEstudiantes").innerHTML = html;
    } catch (error) {
        console.error("Error cargando estudiantes:", error);
        // Fallback
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        let html = "";
        usuarios.forEach(u => {
            if (u.role === "estudiante") {
                html += `<div class="card">${u.fullName}</div>`;
            }
        });
        document.getElementById("listaEstudiantes").innerHTML = html;
    }
}

// INICIAR
mostrarCursos();
mostrarTareas();
mostrarEstudiantes();