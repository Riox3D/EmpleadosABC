import { ref, computed } from 'vue'

const usuarioLogueado = ref({
  nombre: 'Admin RH',
  rol: 'rh',
  claveEmpleado: 'EMP-000',
})

export function useAuth() {
  const simularInicioSesion = (nuevoRol, nuevoNombre, nuevaClave) => {
    usuarioLogueado.value = {
      nombre: nuevoNombre,
      rol: nuevoRol,
      claveEmpleado: nuevaClave,
    }
  }

  return {
    usuarioLogueado,

    esRH: computed(() => usuarioLogueado.value.rol === 'rh'),
    esValidadorTI: computed(() => usuarioLogueado.value.rol === 'validador_ti'),
    esGerente: computed(() => usuarioLogueado.value.rol === 'gerente'),
    esResponsable: computed(() => usuarioLogueado.value.rol === 'responsable'),

    simularInicioSesion,
  }
}
