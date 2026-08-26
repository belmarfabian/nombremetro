# Nombremetro

Nombremetro estima cómo se percibe un nombre y apellido chileno a partir de ocho factores documentados en la literatura sobre nombres, clase y mercado laboral. El usuario escribe su nombre y la aplicación devuelve un puntaje descompuesto, con la referencia académica detrás de cada dimensión.

**Aplicación en línea:** https://belmarfabian.github.io/nombremetro/

## Qué mide

La aplicación descompone el puntaje en ocho factores, cada uno con su referencia académica:

- **Clasismo CL** — carga de clase del apellido en el caso chileno, incluidos apellidos mapuche (Núñez y Gutiérrez). Pesa cinco veces más que el resto: es el factor dominante.
- **Herencia** — persistencia intergeneracional del estatus asociado al apellido (Clark, 2014).
- **Señal Social** — patrones de nombre correlacionados con indicadores socioeconómicos (Figlio, 2005; Fryer y Levitt, 2004).
- **Fonética** — sonidos oclusivos frente a sonorantes, que señalan dominancia o calidez (Sidhu y Pexman, 2018).
- **Fluidez** — facilidad de pronunciación.
- **Longitud** — cantidad de caracteres y complejidad ortográfica.
- **Iniciales** — efectos documentados de la letra inicial.
- **Sesgo Género** — ambigüedad de género del nombre.

## Advertencia

La aplicación es un ejercicio de divulgación sobre clasismo de apellidos en Chile, no un instrumento de medición. Los puntajes traducen hallazgos promedio de estudios poblacionales a un caso individual, y esa traducción no es válida a nivel de persona. El punto no es el número: es que el número exista.

## Cómo funciona

El sitio es HTML, CSS y JavaScript sin dependencias ni servidor. `data.js` contiene las bases de nombres y apellidos con sus ponderadores; `app.js` calcula el puntaje en el navegador. Nada se envía a ningún lado -el cálculo ocurre por completo en la máquina del usuario-.

Para correrlo localmente basta abrir `index.html` en cualquier navegador.

## Autoría

Fabián Belmar — https://belmarfabian.github.io
