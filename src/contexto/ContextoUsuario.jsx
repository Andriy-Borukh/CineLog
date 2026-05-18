import { createContext, useReducer, useEffect } from 'react';

// 1. Estado inicial
const estadoInicial = {
  vistas: JSON.parse(localStorage.getItem('cl_vistas')) || [],
  pendientes: JSON.parse(localStorage.getItem('cl_pendientes')) || [],
  favoritas: JSON.parse(localStorage.getItem('cl_favoritas')) || []
};

// 2. Reducer para gestionar las acciones de las listas
function reducerUsuario(estado, accion) {
  const { tipo, lista, pelicula, id, puntuacion, resena } = accion;

  switch (tipo) {
    case 'AGREGAR_A_LISTA':
      if (estado[lista].some(p => p.id === pelicula.id)) return estado;
      return {
        ...estado,
        [lista]: [...estado[lista], { ...pelicula, puntuacionUsuario: 0, resenaUsuario: '' }]
      };

    case 'ELIMINAR_DE_LISTA':
      return {
        ...estado,
        [lista]: estado[lista].filter(p => p.id !== id) // Corregido un pequeño bug de lógica: para eliminar debe ser !==
      };

    case 'ACTUALIZAR_RESEÑA_PUNTUACION':
      return {
        ...estado,
        vistas: estado.vistas.map(p => 
          p.id === id 
            ? { ...p, puntuacionUsuario: puntuacion, resenaUsuario: resena } 
            : p
        )
      };

    default:
      return estado;
  }
}

// 3. Creación del Contexto (Le quitamos el 'export' directo para no confundir a Fast Refresh)
const ContextoUsuario = createContext();

// 4. Proveedor del Contexto (Único componente exportado en este archivo)
export function ProveedorUsuario({ children }) {
  const [estado, despachar] = useReducer(reducerUsuario, estadoInicial);

  useEffect(() => {
    localStorage.setItem('cl_vistas', JSON.stringify(estado.vistas));
    localStorage.setItem('cl_pendientes', JSON.stringify(estado.pendientes));
    localStorage.setItem('cl_favoritas', JSON.stringify(estado.favoritas));
  }, [estado]);

  return (
    <ContextoUsuario.Provider value={{ estado, despachar }}>
      {children}
    </ContextoUsuario.Provider>
  );
}

// 5. Exportamos el contexto al final de forma limpia junto con el componente
export { ContextoUsuario };