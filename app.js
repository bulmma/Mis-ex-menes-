// Selección de color
let selectedColor = null;
document.querySelectorAll(".color").forEach(c => {
    c.addEventListener("click", () => {
        document.querySelectorAll(".color").forEach(x => x.classList.remove("selected"));
        c.classList.add("selected");
        selectedColor = c.dataset.color;
    });
});

// Cargar exámenes al iniciar
document.addEventListener("DOMContentLoaded", loadExams);

// Añadir examen
function addExam() {
    const asignatura = document.getElementById("asignatura").value.trim();
    const fecha = document.getElementById("fecha").value;

    if (!asignatura || !fecha || !selectedColor) {
        alert("Rellena asignatura, fecha y color");
        return;
    }

    const exam = {
        asignatura,
        fecha,
        color: selectedColor
    };

    const exams = JSON.parse(localStorage.getItem("exams") || "[]");
    exams.push(exam);
    localStorage.setItem("exams", JSON.stringify(exams));

    document.getElementById("asignatura").value = "";
    document.getElementById("fecha").value = "";
    selectedColor = null;
    document.querySelectorAll(".color").forEach(x => x.classList.remove("selected"));

    loadExams();
}

// Mostrar exámenes
function loadExams() {
    const container = document.getElementById("lista");
    const exams = JSON.parse(localStorage.getItem("exams") || "[]");

    if (exams.length === 0) {
        container.innerHTML = `<p class="empty">No hay exámenes guardados</p>`;
        return;
    }

    container.innerHTML = "";

    exams.forEach((exam, index) => {
        const dias = daysLeft(exam.fecha);

        const div = document.createElement("div");
        div.className = "exam";
        div.style.borderLeftColor = exam.color;

        div.innerHTML = `
            <strong>${exam.asignatura}</strong><br>
            ${exam.fecha} — <b>${dias} días</b><br><br>
            <button onclick="deleteExam(${index})">Eliminar</button>
        `;

        container.appendChild(div);
    });
}

// Calcular días restantes
function daysLeft(date) {
    const hoy = new Date();
    const examen = new Date(date);
    const diff = examen - hoy;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

// Eliminar examen
function deleteExam(index) {
    const exams = JSON.parse(localStorage.getItem("exams") || "[]");
    exams.splice(index, 1);
    localStorage.setItem("exams", JSON.stringify(exams));
    loadExams();
}
