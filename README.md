# CineLog 🎬 — Tu Diario Personal de Películas

¡Bienvenidos a **CineLog**! Esta es una aplicación web interactiva de catálogo y diario cinematográfico construida íntegramente con **React 18+**, diseñada para emular plataformas del mercado como Letterboxd o FilmAffinity. El proyecto consume datos en tiempo real de la API pública de **The Movie Database (TMDB)** y permite a los cinéfilos descubrir películas, explorar fichas técnicas detalladas, gestionar listas de seguimiento personales de forma persistente y generar estadísticas de consumo en un perfil privado.

El proyecto ha sido desarrollado siguiendo una arquitectura modular de componentes funcionales, centralizando la lógica en Hooks personalizados y administrando el estado global mediante las APIs nativas de React (`Context API` y `useReducer`).

---

## 📸 Capturas de Pantalla

> _(Nota: Para visualizar correctamente el diseño de la aplicación en producción, se recomienda adjuntar capturas de pantalla reales correspondientes a cada vista en este bloque)._

|                          Vista de Inicio (Catálogo)                           |                           Buscador Avanzado (Filtros)                           |
| :---------------------------------------------------------------------------: | :-----------------------------------------------------------------------------: |
| ![Inicio](https://via.placeholder.com/400x250?text=CineLog+-+Vista+de+Inicio) | ![Buscar](https://via.placeholder.com/400x250?text=CineLog+-+Buscador+Avanzado) |

|                            Ficha de Detalle (Diario)                            |                            Perfil del Usuario (Estadísticas)                             |
| :-----------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------: |
| ![Detalle](https://via.placeholder.com/400x250?text=CineLog+-+Ficha+de+Detalle) | ![Perfil](https://via.placeholder.com/400x250?text=CineLog+-+Perfil+y+Estad%C3%ADsticas) |

---

## 🛠️ Decisiones Técnicas Tomadas

Para cumplir con los exigentes criterios de arquitectura y diseño del módulo, se han tomado las siguientes decisiones de ingeniería de software:

### 1. Gestión del Estado Complejo (`Context API` + `useReducer`)

En lugar de recurrir a prop-drilling o librerías externas pesadas, la gestión de las tres listas independientes del usuario (_Vistas_, _Pendientes_ y _Favoritas_) se ha centralizado en un contexto global estructurado.

- Se implementó un **Reducer en español** (`reducerUsuario`) en `ContextoUsuario.jsx` para despachar acciones deterministas y predecibles como `AGREGAR_A_LISTA`, `ELIMINAR_DE_LISTA` y `ACTUALIZAR_RESEÑA_PUNTUACION`.
- Esto garantiza que el flujo de datos sea unidireccional y las mutaciones de las listas permanezcan síncronas.

### 2. Hooks Personalizados (Abstracción de Lógica)

Se han desacoplado los efectos colaterales de los componentes visuales mediante dos hooks personalizados para encapsular la lógica reutilizable:

- **`usePeliculas`**: Centraliza las peticiones asíncronas a la API de TMDB, aislando los estados nativos de carga (`cargando`), captura de excepciones (`error`), control de colecciones vacías (`esVacio`) y paginación dinámica.
- **`useListaUsuario`**: Proporciona una interfaz limpia para que cualquier componente pueda consultar si una película ya forma parte del diario (`estaEnLista`), guardarla o modificar sus calificaciones sin interactuar directamente con el despachador de acciones del contexto.

### 3. Persistencia de Datos Local (`localStorage`)

Para ofrecer una experiencia persistente sin necesidad de una infraestructura de Base de Datos externa, se integró un efecto de sincronización automática en el proveedor del contexto. Cada vez que el estado global de las listas sufre una modificación, los objetos serializados en JSON se vuelcan instantáneamente en el almacenamiento local del navegador, recuperándose de forma síncrona en el arranque inicial de la aplicación.

### 4. Estrategia de Estilos e Interfaz Coherente

Se ha optado por un diseño de interfaz minimalista, moderno y adaptativo (_responsive_), enfocado en la temática cinematográfica (esquema de color oscuro/dark con acentos de color selectivos para indicar el estado de las películas). La maquetación se realiza optimizando el rendimiento de renderizado y asegurando que los elementos críticos (como las tarjetas del catálogo y las listas de desplazamiento horizontal del perfil) se distribuyan de forma fluida.

---

## 🚀 Instrucciones de Instalación y Arranque en Local

Sigue estos pasos para clonar el repositorio y desplegar un servidor de desarrollo local en tu máquina:

### Prerrequisitos

Debes tener instalado **Node.js** (versión 18 o superior recomendada) y el gestor de paquetes **npm** en tu equipo.

### Pasos para el despliegue

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/tu-usuario/CineLog.git](https://github.com/tu-usuario/CineLog.git)
   cd CineLog
   ```
