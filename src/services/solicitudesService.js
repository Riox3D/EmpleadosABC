const mockSolicitudes = [
  {
    idSolicitud: 'SOL-001',
    tipoMovimiento: 'Alta',
    estatusSolicitud: 'En proceso',
    nombreCompleto: 'Juan Pérez Rodríguez',
    claveEmpleado: 'EMP-123',
  },
  {
    idSolicitud: 'SOL-002',
    tipoMovimiento: 'Baja',
    estatusSolicitud: 'Finalizada',
    nombreCompleto: 'Ana López',
    claveEmpleado: 'EMP-124',
  },
]

const mockDetalles = {
  'SOL-001': {
    curp: 'JUPR900101HDFRXX00',
    areaAdscripcion: 'Tecnologías de la Información (TI)',
    fechaIngreso: '01/11/2023',
    pasos: [
      {
        titulo: 'Creación de correo',
        responsableNombre: 'Juan Pérez',
        completado: false,
        dato: '',
        comentario: '',
      },
      {
        titulo: 'Creación de cuenta A.D',
        responsableNombre: 'María López',
        completado: false,
        dato: '',
        comentario: '',
      },
      {
        titulo: 'Creación y entrega de credencial',
        responsableNombre: 'Juan Pérez',
        completado: false,
        dato: '',
        comentario: '',
      },
    ],
  },
  'SOL-002': {
    curp: 'ANLO850515MDFRXX00',
    areaAdscripcion: 'Recursos Humanos',
    fechaIngreso: '15/05/2018',
    pasos: [
      {
        titulo: 'Baja en sistema',
        responsableNombre: 'Admin',
        completado: true,
        dato: '',
        comentario: 'Baja procesada en ERP',
      },
      {
        titulo: 'Recolección de equipo',
        responsableNombre: 'Soporte',
        completado: true,
        dato: 'Laptop Dell entregada',
        comentario: 'Sin daños',
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

  const detalle = mockDetalles[idSolicitud] || mockDetalles['SOL-001']

  if (!solicitudBase) {
    throw new Error('Solicitud no encontrada en la base de datos')
  }

  return {
    ...solicitudBase,
    ...detalle,
  }
}

export const apiActualizarAvances = async (idSolicitud, nuevosPasos) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  console.log(`Datos guardados en la BD para ${idSolicitud}:`, nuevosPasos)
  return true
}
