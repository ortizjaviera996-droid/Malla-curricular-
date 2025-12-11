// --- 1. Definición de la Malla Curricular y Requisitos ---

const CURRICULUM = {
    "Semestre 1": [
        "Introducción al Derecho",
        "Teoría Política y Constitucional",
        "Expresión Oral",
        "Escritura Académica e Investigación Jurídica",
        "Historia de la Cultura Moderna",
        "Inglés I"
    ],
    "Semestre 2": [
        "Introducción al Derecho Privado",
        "Derecho Constitucional I y Derechos Fundamentales",
        "Introducción a la Abogacía",
        "Teoría General del Derecho",
        "Historia de las Ideologías en Chile",
        "Inglés II"
    ],
    "Semestre 3": [
        "Derecho Civil I: Personas y Bienes",
        "Derecho Constitucional II: Recursos",
        "Derecho Procesal I: Instituciones Procesales",
        "Teoría de la Justicia",
        "Sociología",
        "Optativo Formación Teológica (S3)",
        "Optativo Formación General (S3)"
    ],
    "Semestre 4": [
        "Derecho Civil II: Acto Jurídico",
        "Derecho Constitucional III: Orgánico",
        "Derecho Procesal II: Procedimiento Ordinario",
        "Derecho y Justicia Social",
        "Economía Política",
        "Optativo Formación Teológica (S4)",
        "Optativo Formación General (S4)"
    ],
    "Semestre 5": [
        "Derecho Civil III: Obligaciones",
        "Derecho Administrativo I: Parte General",
        "Derecho Procesal III: Jurisdicción cautelar y juicio ejecutivo",
        "Derecho Laboral I: Derecho Individual",
        "Derecho Económico",
        "Derecho Penal I: Parte General"
    ],
    "Semestre 6": [
        "Derecho Civil IV: Responsabilidad",
        "Derecho Administrativo II: Parte Especial",
        "Derecho Procesal IV: Recursos",
        "Derecho Laboral II: Derecho Colectivo",
        "Derecho Comercial I",
        "Derecho Penal II: Parte General y Especial"
    ],
    "Semestre 7": [
        "Derecho Civil V: Actos Jurídicos Parte Especial",
        "Derecho Internacional Público",
        "Derecho Procesal V: Proceso Penal",
        "Derecho Tributario",
        "Derecho Comercial II: Derecho Societario",
        "Derecho Penal III: Parte Especial"
    ],
    "Semestre 8": [
        "Derecho Civil VI: Familia y Sucesorio",
        "Derecho Comparado",
        "Derecho Probatorio",
        "Ética y Profesiones Jurídicas",
        "Derecho Concursal",
        "Derecho Internacional Privado"
    ],
    "Semestre 9": [
        "Clínica Jurídica I",
        "Método de Análisis de Casos I",
        "Litigación Estratégica I: Teoría del Caso + Litigación Penal",
        "Investigación Jurídica Aplicada",
        "Optativo Complementario (S9-1)",
        "Optativo Complementario (S9-2)"
    ],
    "Semestre 10": [
        "Clínica Jurídica II",
        "Método de Análisis de Casos II: Análisis de Sentencias",
        "Litigación Estratégica II: Litigación Civil + Negociación",
        "Optativo Complementario (S10-1)",
        "Optativo Complementario (S10-2)"
    ]
};

// Mapeo de requisitos: Nombre del ramo -> Array de requisitos
const PREREQUISITES = {
    // Requisitos de la carrera
    "Derecho Civil II: Acto Jurídico": ["Derecho Civil I: Personas y Bienes"],
    "Derecho Procesal II: Procedimiento Ordinario": ["Derecho Procesal I: Instituciones Procesales"],
    "Derecho Constitucional III: Orgánico": ["Derecho Constitucional II: Recursos"],
    "Derecho Civil III: Obligaciones": ["Derecho Civil II: Acto Jurídico"],
    "Derecho Procesal III: Jurisdicción cautelar y juicio ejecutivo": ["Derecho Procesal II: Procedimiento Ordinario"],
    "Derecho Penal I: Parte General": ["Teoría General del Derecho"], // Asunción lógica
    "Derecho Civil IV: Responsabilidad": ["Derecho Civil III: Obligaciones"],
    "Derecho Administrativo II: Parte Especial": ["Derecho Administrativo I: Parte General"],
    "Derecho Procesal IV: Recursos": ["Derecho Procesal III: Jurisdicción cautelar y juicio ejecutivo"],
    "Derecho Laboral II: Derecho Colectivo": ["Derecho Laboral I: Derecho Individual"],
    "Derecho Comercial I": ["Introducción al Derecho Privado"], // Asunción lógica
    "Derecho Penal II: Parte General y Especial": ["Derecho Penal I: Parte General"],
    "Derecho Civil V: Actos Jurídicos Parte Especial": ["Derecho Civil IV: Responsabilidad"],
    "Derecho Comercial II: Derecho Societario": ["Derecho Comercial I"],
    "Derecho Penal III: Parte Especial": ["Derecho Penal II: Parte General y Especial"],
    "Derecho Procesal V: Proceso Penal": ["Derecho Procesal IV: Recursos"], // Asunción lógica
    "Derecho Civil VI: Familia y Sucesorio": ["Derecho Civil V: Actos Jurídicos Parte Especial"],
    "Clínica Jurídica II": ["Clínica Jurídica I"],
    "Método de Análisis de Casos II: Análisis de Sentencias": ["Método de Análisis de Casos I"],
    "Litigación Estratégica II: Litigación Civil + Negociación": ["Litigación Estratégica I: Teoría del Caso + Litigación Penal"],
    "Inglés II": ["Inglés I"] // Requisito de idioma
    // NOTA: Se asume que los Optativos de S3/S4 son requisitos para los de S9/S10, pero se simplifican aquí como ramos independientes.
};

const STORAGE_KEY = 'approvedCourses_Derecho';
let approvedCourses = {};

// --- 2. Funciones de Persistencia (LocalStorage) ---

/**
 * Carga el estado de los ramos aprobados desde localStorage.
 */
function loadApprovedCourses() {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
        approvedCourses = JSON.parse(storedData);
    } else {
        approvedCourses = {}; // Inicializa si no hay datos
    }
}

/**
 * Guarda el estado actual de los ramos aprobados en localStorage.
 */
function saveApprovedCourses() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(approvedCourses));
}

// --- 3. Funciones de Validación y Bloqueo ---

/**
 * Verifica si un ramo está bloqueado (le faltan requisitos).
 * @param {string} courseName - Nombre del ramo.
 * @returns {Array<string>} - Array con los nombres de los requisitos faltantes.
 */
function getMissingPrerequisites(courseName) {
    const required = PREREQUISITES[courseName];
    if (!required) {
        return []; // No tiene requisitos
    }

    return required.filter(req => !approvedCourses[req]);
}

/**
 * Muestra el modal de ramo bloqueado.
 * @param {string} courseName - Nombre del ramo bloqueado.
 * @param {Array<string>} missingReqs - Lista de requisitos faltantes.
 */
function showBlockerMessage(courseName, missingReqs) {
    const modal = document.getElementById('blockerMessage');
    const modalTitle = document.getElementById('modalTitle');
    const modalText = document.getElementById('modalText');

    modalTitle.textContent = `¡Alto! Ramo Bloqueado: ${courseName}`;
    
    let htmlContent = `<p>Para inscribir/aprobar **${courseName}**, primero debes aprobar los siguientes requisitos:</p>`;
    htmlContent += '<ul>';
    missingReqs.forEach(req => {
        htmlContent += `<li>${req}</li>`;
    });
    htmlContent += '</ul>';

    modalText.innerHTML = htmlContent;
    modal.style.display = 'block';
}

/**
 * Oculta el modal de bloqueo.
 */
function closeModal() {
    document.getElementById('blockerMessage').style.display = 'none';
}

// Para cerrar el modal al hacer clic fuera de él
window.onclick = function(event) {
    const modal = document.getElementById('blockerMessage');
    if (event.target == modal) {
        closeModal();
    }
}

// --- 4. Renderizado y Eventos ---

/**
 * Maneja el evento de clic en una tarjeta de ramo.
 * @param {Event} event - El evento de clic.
 */
function handleCourseClick(event) {
    const card = event.currentTarget;
    const courseName = card.dataset.course;

    const missingReqs = getMissingPrerequisites(courseName);

    if (missingReqs.length > 0 && !card.classList.contains('approved')) {
        // Ramo bloqueado y no aprobado
        showBlockerMessage(courseName, missingReqs);
        return;
    }

    // Toggle (cambiar) el estado de aprobado
    if (approvedCourses[courseName]) {
        delete approvedCourses[courseName]; // Desaprobar
    } else {
        approvedCourses[courseName] = true; // Aprobar
    }

    saveApprovedCourses(); // Guardar el nuevo estado
    updateCurriculumView(); // Actualizar toda la vista para recalcular bloqueos
}

/**
 * Crea el elemento HTML para una tarjeta de asignatura.
 * @param {string} courseName - Nombre del ramo.
 * @returns {HTMLElement} - La tarjeta del ramo.
 */
function createCourseCard(courseName) {
    const card = document.createElement('div');
    card.className = 'course-card';
    card.textContent = courseName;
    card.dataset.course = courseName;
    card.addEventListener('click', handleCourseClick);
    return card;
}

/**
 * Actualiza las clases CSS de todas las tarjetas basado en el estado.
 * Se llama al cargar y después de cada clic.
 */
function updateCurriculumView() {
    const allCourses = document.querySelectorAll('.course-card');

    allCourses.forEach(card => {
        const courseName = card.dataset.course;
        const missingReqs = getMissingPrerequisites(courseName);

        // 1. Limpiar clases
        card.classList.remove('approved', 'blocked');

        // 2. Aplicar estado 'approved'
        if (approvedCourses[courseName]) {
            card.classList.add('approved');
            // Un ramo aprobado no puede estar bloqueado, ignora el siguiente paso
        } 
        
        // 3. Aplicar estado 'blocked' (solo si no está aprobado)
        else if (missingReqs.length > 0) {
            card.classList.add('blocked');
        }
    });
}

/**
 * Inicializa la malla curricular: crea la estructura y aplica los estados.
 */
function initCurriculum() {
    const grid = document.getElementById('curriculumGrid');
    
    // Iterar sobre cada semestre
    for (const semesterName in CURRICULUM) {
        const courses = CURRICULUM[semesterName];

        // Crear columna de semestre
        const column = document.createElement('div');
        column.className = 'semester-column';
        column.innerHTML = `<h2>${semesterName}</h2>`;

        // Crear tarjetas de ramos
        courses.forEach(courseName => {
            const card = createCourseCard(courseName);
            column.appendChild(card);
        });

        grid.appendChild(column);
    }

    // Aplicar los estados iniciales (cargados de LocalStorage)
    updateCurriculumView();
}

// --- 5. Ejecución al Cargar la Página ---

document.addEventListener('DOMContentLoaded', () => {
    loadApprovedCourses(); // 1. Cargar el estado guardado
    initCurriculum();      // 2. Renderizar la estructura y aplicar los estados
});

// Exportar closeModal para que funcione el botón 'x' en HTML
window.closeModal = closeModal;
