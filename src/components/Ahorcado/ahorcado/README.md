# Juego del Ahorcado en React

Este es un clásico juego del ahorcado construido como una aplicación web utilizando React. El objetivo del proyecto es servir como una herramienta de aprendizaje para entender los conceptos fundamentales de React de una manera práctica e interactiva.

## Tecnologías Utilizadas

*   **React:** Biblioteca principal para construir la interfaz de usuario.
*   **React Hooks (`useState`, `useEffect`):** Para manejar el estado del componente y los efectos secundarios.
*   **CSS:** Para los estilos y la apariencia visual del juego.
*   **JavaScript (ES6+):** Para la lógica del juego.

## Instalación y Ejecución

Para ejecutar este proyecto en tu máquina local, sigue estos pasos:

1.  **Clona el repositorio (si aplica) o asegúrate de tener los archivos del proyecto.**

2.  **Instala las dependencias:**
    Abre una terminal en el directorio del proyecto y ejecuta el siguiente comando:
    ```bash
    npm install
    ```

3.  **Inicia la aplicación:**
    Una vez que la instalación se complete, ejecuta:
    ```bash
    npm start
    ```
    Esto iniciará la aplicación en modo de desarrollo y la abrirá automáticamente en tu navegador en [http://localhost:3000](http://localhost:3000).

---

## Guía de Aprendizaje: Cómo Funciona el Juego

Este tutorial te guiará a través de los conceptos fundamentales de React y cómo se aplican en la práctica para construir esta aplicación.

### Parte 1: La Teoría (Conceptos Clave de React)

Este proyecto es un excelente ejemplo para entender los pilares de React.

#### 1. **Componentes: Los Bloques de Construcción**

*   **¿Qué son?** Imagina que tu aplicación es una casa hecha de legos. Cada pieza de lego es un **componente**. Es una pieza de UI (interfaz de usuario) independiente, reutilizable y con su propia lógica.
*   **En este código:**
    *   `App.js`: Es el componente principal que organiza todo.
    *   `Header.js`: Muestra el título.
    *   `Figure.js`: Dibuja al ahorcado.
    *   `Word.js`: Muestra la palabra a adivinar.
    *   `Popup.js`: La ventana emergente de victoria/derrota.
    *   Y los demás... cada uno tiene una única responsabilidad.

#### 2. **Estado (State) y el Hook `useState`**

*   **¿Qué es?** El "estado" es la memoria de un componente. Es un conjunto de datos que, cuando cambian, hacen que el componente se vuelva a renderizar para mostrar la información actualizada.
*   **`useState`**: Es un "Hook" (una función especial de React) que te permite añadir estado a un componente. Te devuelve dos cosas: el valor actual del estado y una función para actualizarlo.
*   **En este código (`App.js`):**
    *   `const [playable, setPlayable] = useState(true);`: Guarda si el juego está activo o ha terminado.
    *   `const [correctLetters, setCorrectLetters] = useState([]);`: Una lista de las letras correctas que ha adivinado el usuario.
    *   `const [wrongLetters, setWrongLetters] = useState([]);`: Una lista de las letras incorrectas.
    *   `const [selectedWord, setSelectedWord] = useState(...)`: La palabra que se debe adivinar.

#### 3. **Props (Propiedades): Comunicación entre Componentes**

*   **¿Qué son?** Si los componentes son legos, las "props" son la forma en que se conectan y pasan información. Los datos fluyen en una sola dirección: de un componente padre a un componente hijo.
*   **En este código:** `App.js` (el padre) necesita que `Figure.js` (el hijo) sepa cuántas letras incorrectas hay para dibujar al ahorcado. Lo hace así:
    ```jsx
    // En App.js (Componente Padre)
    <Figure wrongLetters={wrongLetters} />
    ```
    `App.js` le pasa su estado `wrongLetters` al componente `Figure` como una "prop" llamada `wrongLetters`.

*   **Ejemplo Conceptual:** Dentro de `Figure.js` (el componente hijo), se reciben estas props y se utilizan para determinar cuántas partes del cuerpo del ahorcado mostrar.
    ```jsx
    // En Figure.js (Componente Hijo)
    const Figure = ({ wrongLetters }) => {
      const errors = wrongLetters.length;

      return (
        <svg>
          {/* ... código del SVG ... */}
          {/* La cabeza solo se muestra si hay más de 0 errores */}
          {errors > 0 && <circle cx="140" cy="70" r="20" />}
          {/* El cuerpo solo se muestra si hay más de 1 error */}
          {errors > 1 && <line x1="140" y1="90" x2="140" y2="150" />}
          {/* ... y así sucesivamente ... */}
        </svg>
      );
    };
    ```

#### 4. **Efectos Secundarios y el Hook `useEffect`**

*   **¿Qué es?** A veces, un componente necesita hacer cosas que no están directamente relacionadas con el renderizado, como escuchar las teclas que presiona el usuario. A esto se le llama "efecto secundario".
*   **`useEffect`**: Este Hook te permite ejecutar efectos secundarios. Le dices qué código ejecutar y cuándo ejecutarlo (por ejemplo, solo la primera vez que el componente se monta, o cada vez que una variable de estado específica cambia).
*   **En este código (`App.js`):**
    *   El primer `useEffect` se encarga de escuchar los eventos del teclado (`window.addEventListener('keydown', ...)`). La lista de dependencias al final le dice a React cuándo debe re-ejecutar el efecto.
    *   El segundo `useEffect` se ejecuta cada vez que cambia el estado del juego (`gameStatus`) para detener el juego si se ha ganado o perdido.

#### 5. **Renderizado Condicional: Mostrar y Ocultar UI**

*   **¿Qué es?** Es la técnica para mostrar u ocultar componentes o elementos HTML basándose en el estado actual.
*   **En este código:**
    *   **El Popup:** La ventana emergente solo debe aparecer cuando el juego termina. Esta línea en `App.js` lo logra:
        ```jsx
        {gameStatus !== '' && <Popup ... />}
        ```
        Esto se lee como: "Si `gameStatus` NO está vacío, entonces renderiza el componente `Popup`".
    *   **La Notificación:** En `Notification.js`, se añade una clase CSS condicionalmente para mostrarla u ocultarla con una transición.

---

### Parte 2: Cómo Está Hecho tu Juego (Análisis del Código)

Ahora veamos cómo estas piezas teóricas se unen para que tu juego funcione.

#### **Paso 1: Inicio del Juego**

1.  Cuando la aplicación carga, el componente `App.js` se renderiza por primera vez.
2.  Se inicializa el estado con `useState`: `playable` es `true`, `correctLetters` y `wrongLetters` son arrays vacíos, y se elige una `selectedWord` al azar de la lista.

#### **Paso 2: El Jugador Presiona una Tecla**

1.  El primer `useEffect` en `App.js` registra un "escuchador" de eventos de teclado (`handleKeydown`).
2.  Cuando presionas una tecla:
    *   La función `handleKeydown` se activa.
    *   Verifica si el juego es `playable` y si la tecla es una letra.
    *   Comprueba si la letra está en la `selectedWord`.
    *   **Si es correcta:** Llama a `setCorrectLetters`, añadiendo la letra a la lista.
    *   **Si es incorrecta:** Llama a `setWrongLetters`, añadiendo la letra a la lista.
    *   **Si la letra ya fue usada:** Llama a `show(setShowNotification)` para mostrar la notificación.

#### **Paso 3: La Magia de React: La UI se Actualiza Sola**

1.  Al llamar a `setCorrectLetters` o `setWrongLetters`, React detecta un cambio en el estado y vuelve a renderizar `App` y sus hijos.
2.  **¿Qué cambia en la pantalla?**
    *   `Word` muestra la letra correcta.
    *   `WrongLetters` muestra la letra incorrecta.
    *   `Figure` dibuja la siguiente parte del ahorcado si es necesario.

#### **Paso 4: Comprobar si se ha Ganado o Perdido**

1.  La variable `gameStatus` en `App.js` se recalcula en cada renderizado con la función `checkWin`.
2.  `checkWin` (en `helpers.js`) determina si el jugador ha ganado (todas las letras adivinadas) o perdido (6 letras incorrectas).
3.  Un `useEffect` observa `gameStatus`. Si cambia a `'win'` o `'lose'`, establece `playable` en `false`.

#### **Paso 5: Fin del Juego y Jugar de Nuevo**

1.  Como `gameStatus` ya no está vacío, el renderizado condicional muestra el componente `Popup`.
2.  El `Popup` muestra el mensaje final y un botón de "Jugar de Nuevo".
3.  Al hacer clic, la función `playAgain` en `App.js` resetea todo el estado a sus valores iniciales, y el ciclo vuelve a empezar.
