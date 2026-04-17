const mockSolicitudes = [
  {
    idSolicitud: 'SOL-001',
    tipoMovimiento: 'Alta',
    estatusSolicitud: 'Pendiente de validación TI',
    nombreCompleto: 'Juan Pérez Rodríguez',
    claveEmpleado: 'EMP-123',
    jefeInmediato: 'Roberto Gómez',
    responsables: ['TI - Infraestructura'],
  },
  {
    idSolicitud: 'SOL-002',
    tipoMovimiento: 'Baja',
    estatusSolicitud: 'Pendiente aprobación gerencial',
    nombreCompleto: 'Ana López',
    claveEmpleado: 'EMP-124',
    jefeInmediato: 'Roberto Gómez',
    responsables: ['TI - Soporte'],
  },
  {
    idSolicitud: 'SOL-003',
    tipoMovimiento: 'Alta',
    estatusSolicitud: 'En proceso',
    nombreCompleto: 'Carlos Ruiz',
    claveEmpleado: 'EMP-125',
    jefeInmediato: 'Roberto Gómez',
    responsables: ['Soporte TI', 'Sistema'], // "Soporte TI" es nuestro usuario de prueba
  },
]

const mockDetalles = {
  'SOL-001': {
    curp: 'JUPR900101HDFRXX00',
    nssIssste: '12345678901',
    direccion: 'Av. Siempre Viva 742, Col. Centro',
    gerencia: 'Desarrollo de Software',
    jefeInmediato: 'Roberto Gómez',
    fechaIngreso: '01/11/2023',
    rbac: {
      edificios: ['Sede Principal', 'Laboratorio B'],
      sistemas: [
        { nombre: 'ERP Institucional', rol: 'Usuario Base' },
        { nombre: 'Jira', rol: 'Desarrollador' },
      ],
    },
    pasos: [
      {
        titulo: 'Aprobación de TI',
        responsableNombre: 'TI - Infraestructura',
        completado: false,
        dato: '',
        comentario: '',
        esAutomatica: false,
        generaNotificacionJefe: false,
      },
      {
        titulo: 'Sincronización en Active Directory',
        responsableNombre: 'Sistema',
        completado: false,
        dato: 'Sincronizado OK',
        comentario: '',
        esAutomatica: true,
        generaNotificacionJefe: false,
      },
    ],
  },
  'SOL-002': {
    curp: 'ANLO850515MDFRXX00',
    nssIssste: '09876543210',
    direccion: 'Calle Falsa 123, Col. Norte',
    gerencia: 'Recursos Humanos',
    jefeInmediato: 'María Antonieta',
    fechaIngreso: '15/05/2018',
    rbac: { edificios: [], sistemas: [] },
    pasos: [
      {
        titulo: 'Configuracion de RBAC',
        responsableNombre: 'Sistema',
        completado: true,
        dato: '',
        comentario: 'RBAC 1 Asignado',
        esAutomatica: true,
        generaNotificacionJefe: true,
      },
    ],
  },
}

export const apiObtenerSolicitudes = async () => {
  await new Promise((resolve) => setTimeout(resolve, 800))
  return mockSolicitudes
}

export const apiObtenerSeguimiento = async (idSolicitud) => {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const solicitudBase = mockSolicitudes.find((s) => s.idSolicitud === idSolicitud)

  /* Fallback a SOL-001: Previene que la vista crashee buscando propiedades en undefined
     si el router envía un ID que no existe en nuestro mock local. */
  const detalle = mockDetalles[idSolicitud] || mockDetalles['SOL-001']

  if (!solicitudBase) {
    throw new Error('Solicitud no encontrada')
  }

  return {
    ...solicitudBase,
    ...detalle,
  }
}

export const apiActualizarAvances = async (idSolicitud, nuevosPasos) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  console.log(`Payload BD [${idSolicitud}]:`, nuevosPasos)
  return true
}
