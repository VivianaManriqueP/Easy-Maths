// Esperamos a que el DOM esté completamente cargado antes de ejecutar cualquier script
document.addEventListener('DOMContentLoaded', () => {
    const formularioPregunta = document.getElementById('formulario-pregunta');
    const publicaciones = document.getElementById('publicaciones');

    // Función para agregar una nueva pregunta a la lista de preguntas publicadas
    const agregarPregunta = (nombre, duda) => {
        const divPublicacion = document.createElement('div');
        divPublicacion.className = 'publicacion';

        const nombreElemento = document.createElement('h3');
        nombreElemento.textContent = nombre;

        const dudaElemento = document.createElement('p');
        dudaElemento.textContent = duda;

        divPublicacion.appendChild(nombreElemento);
        divPublicacion.appendChild(dudaElemento);

        publicaciones.appendChild(divPublicacion);
    };

    // Manejador de eventos para el envío del formulario
    formularioPregunta.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const duda = document.getElementById('duda').value;

        agregarPregunta(nombre, duda);

        // Limpiamos el formulario después de enviar la pregunta
        formularioPregunta.reset();
    });
});