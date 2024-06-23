document.addEventListener('DOMContentLoaded', () => {
    const formularioPregunta = document.getElementById('formulario-pregunta');
    const publicaciones = document.getElementById('publicaciones');

    // Cargar publicaciones guardadas al cargar la página
    cargarPublicacionesGuardadas();

    // Función para cargar las publicaciones guardadas en localStorage
    function cargarPublicacionesGuardadas() {
        const publicacionesGuardadas = JSON.parse(localStorage.getItem('publicaciones')) || [];

        publicacionesGuardadas.forEach((publicacion) => {
            agregarPublicacion(publicacion.nombre, publicacion.duda, publicacion.respuestas);
        });
    }

    // Función para agregar una nueva pregunta a la lista de preguntas publicadas
    function agregarPublicacion(nombre, duda, respuestas = []) {
        const divPublicacion = document.createElement('div');
        divPublicacion.className = 'publicacion';

        const nombreElemento = document.createElement('h3');
        nombreElemento.textContent = nombre;

        const dudaElemento = document.createElement('p');
        dudaElemento.textContent = duda;

        const divRespuestas = document.createElement('div');
        divRespuestas.className = 'respuestas';

        respuestas.forEach((respuesta) => {
            const respuestaDiv = document.createElement('div');
            respuestaDiv.classList.add('respuesta');
            respuestaDiv.innerHTML = `<p><strong>${respuesta.nombre}:</strong> ${respuesta.texto}</p>`;
            divRespuestas.appendChild(respuestaDiv);
        });

        const formularioRespuesta = `
            <form class="formulario-respuesta">
                <input type="text" class="nombre-respuesta" placeholder="Tu nombre" required>
                <textarea class="texto-respuesta" placeholder="Escribe tu respuesta aquí..." required></textarea>
                <button type="submit" class="btn-responder">Responder</button>
            </form>
        `;
        divRespuestas.innerHTML += formularioRespuesta;

        divPublicacion.appendChild(nombreElemento);
        divPublicacion.appendChild(dudaElemento);
        divPublicacion.appendChild(divRespuestas);

        publicaciones.appendChild(divPublicacion);
    }

    // Manejador de eventos para el envío del formulario
    formularioPregunta.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const duda = document.getElementById('duda').value;

        // Guardar la nueva publicación en localStorage
        const nuevaPublicacion = {
            nombre: nombre,
            duda: duda,
            respuestas: []
        };

        guardarPublicacion(nuevaPublicacion);

        // Agregar la publicación a la lista
        agregarPublicacion(nombre, duda);

        // Limpiar el formulario después de enviar la pregunta
        formularioPregunta.reset();
    });

    // Función para guardar una publicación en localStorage
    function guardarPublicacion(publicacion) {
        const publicacionesGuardadas = JSON.parse(localStorage.getItem('publicaciones')) || [];
        publicacionesGuardadas.push(publicacion);
        localStorage.setItem('publicaciones', JSON.stringify(publicacionesGuardadas));
    }

    // Evento para manejar la respuesta
    publicaciones.addEventListener('submit', function(e) {
        e.preventDefault();

        if (e.target && e.target.classList.contains('formulario-respuesta')) {
            const nombreRespuesta = e.target.querySelector('.nombre-respuesta').value;
            const textoRespuesta = e.target.querySelector('.texto-respuesta').value;

            if (nombreRespuesta && textoRespuesta) {
                const respuestaDiv = document.createElement('div');
                respuestaDiv.classList.add('respuesta');
                respuestaDiv.innerHTML = `<p><strong>${nombreRespuesta}:</strong> ${textoRespuesta}</p>`;
                e.target.parentNode.querySelector('.respuestas').appendChild(respuestaDiv);

                // Guardar la respuesta en localStorage
                const publicacionesGuardadas = JSON.parse(localStorage.getItem('publicaciones')) || [];
                const index = publicacionesGuardadas.findIndex(publicacion => publicacion.duda === e.target.parentNode.querySelector('p').textContent);
                publicacionesGuardadas[index].respuestas.push({ nombre: nombreRespuesta, texto: textoRespuesta });
                localStorage.setItem('publicaciones', JSON.stringify(publicacionesGuardadas));

                // Limpiar formulario después de agregar la respuesta
                e.target.querySelector('.nombre-respuesta').value = '';
                e.target.querySelector('.texto-respuesta').value = '';
            }
        }
    });
});