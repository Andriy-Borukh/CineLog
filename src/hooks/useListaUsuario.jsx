import { useContext } from 'react';
import { ContextoUsuario } from '../contexto/ContextoUsuario';

export function useListaUsuario() {
  const context = useContext(ContextoUsuario);
  if (!context) {
    throw new Error('useListaUsuario debe usarse dentro de un ProveedorUsuario');
  }

  const { estado, despachar } = context;

  const agregarALista = (nombreLista, pelicula) => {
    despachar({ tipo: 'AGREGAR_A_LISTA', lista: nombreLista, pelicula });
  };

  const eliminarDeLista = (nombreLista, id) => {
    despachar({ tipo: 'ELIMINAR_DE_LISTA', lista: nombreLista, id });
  };

  const valorarPelicula = (id, puntuacion, resena) => {
    despachar({ tipo: 'ACTUALIZAR_RESEÑA_PUNTUACION', id, puntuacion, resena });
  };

  // Verifica si una película ya está en una lista específica (p.ej. 'favoritas')
  const estaEnLista = (nombreLista, id) => {
    return estado[nombreLista].some(p => p.id === id);
  };

  return {
    listas: estado, // Contiene vistas, pendientes y favoritas
    agregarALista,
    eliminarDeLista,
    valorarPelicula,
    estaEnLista
  };
}