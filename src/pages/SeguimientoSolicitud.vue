<template>
  <q-page class="q-pa-lg bg-grey-1">
    <div class="row justify-center relative-position">
      <q-inner-loading :showing="cargando" style="z-index: 10">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>

      <div class="col-12 col-xl-10" v-if="!cargando">
        <q-card class="shadow-3 q-mb-lg" style="border-radius: 12px">
          <q-card-section class="bg-primary text-white row items-center justify-between q-pa-md">
            <div class="row items-center q-gutter-md">
              <q-btn icon="arrow_back" flat round dense color="white" @click="$router.back()">
                <q-tooltip class="bg-primary">Regresar a Solicitudes</q-tooltip>
              </q-btn>
              <div>
                <div class="text-h6 text-weight-bold">Seguimiento de Solicitud</div>
                <div class="text-subtitle2 text-white" style="opacity: 0.8">
                  Folio: {{ solicitud.idSolicitud }}
                </div>
              </div>
            </div>

            <q-chip
              :color="solicitud.estatusSolicitud === 'En proceso' ? 'warning' : 'positive'"
              text-color="white"
              icon="sync"
              class="text-weight-bold"
            >
              {{ solicitud.estatusSolicitud }}
            </q-chip>
          </q-card-section>
        </q-card>

        <div class="row q-col-gutter-lg">
          <div class="col-12 col-md-4">
            <q-card class="shadow-3 full-height" style="border-radius: 12px">
              <q-card-section class="bg-grey-2">
                <div class="text-subtitle1 text-weight-bold text-primary row items-center">
                  <q-icon name="assignment_ind" size="sm" class="q-mr-sm" />
                  Datos de la Solicitud (RH)
                </div>
              </q-card-section>
              <q-separator />

              <q-list class="q-pa-sm">
                <q-item>
                  <q-item-section avatar>
                    <q-icon color="grey-7" name="swap_horiz" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label caption>Tipo de Movimiento</q-item-label>
                    <q-item-label class="text-weight-bold">{{
                      solicitud.tipoMovimiento
                    }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section avatar><q-icon color="grey-7" name="person" /></q-item-section>
                  <q-item-section>
                    <q-item-label caption>Empleado</q-item-label>
                    <q-item-label>{{ solicitud.nombreCompleto }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section avatar><q-icon color="grey-7" name="badge" /></q-item-section>
                  <q-item-section>
                    <q-item-label caption>CURP</q-item-label>
                    <q-item-label style="text-transform: uppercase">{{
                      solicitud.curp
                    }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section avatar><q-icon color="grey-7" name="business" /></q-item-section>
                  <q-item-section>
                    <q-item-label caption>Área de adscripción</q-item-label>
                    <q-item-label>{{ solicitud.areaAdscripcion }}</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item>
                  <q-item-section avatar><q-icon color="grey-7" name="event" /></q-item-section>
                  <q-item-section>
                    <q-item-label caption>Fecha de ingreso</q-item-label>
                    <q-item-label>{{ solicitud.fechaIngreso }}</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card>
          </div>

          <div class="col-12 col-md-8">
            <q-card class="shadow-3 full-height flex column" style="border-radius: 12px">
              <q-card-section class="bg-grey-2 row items-center justify-between">
                <div class="text-subtitle1 text-weight-bold text-primary row items-center">
                  <q-icon name="checklist" size="sm" class="q-mr-sm" />
                  Avance de Tareas
                </div>
                <q-btn
                  label="Actualizar Avances"
                  icon="edit_document"
                  color="primary"
                  unelevated
                  dense
                  class="q-px-sm text-weight-bold"
                  @click="abrirDialogo"
                />
              </q-card-section>
              <q-separator />

              <q-card-section class="q-pa-lg col-grow">
                <q-timeline color="secondary" layout="loose">
                  <q-timeline-entry
                    v-for="(paso, index) in pasos"
                    :key="index"
                    :title="paso.titulo"
                    :subtitle="paso.completado ? 'Completado' : 'Pendiente'"
                    :color="paso.completado ? 'positive' : 'grey-5'"
                    :icon="paso.completado ? 'check_circle' : 'schedule'"
                  >
                    <div
                      class="q-mt-sm q-pa-md rounded-borders"
                      :class="paso.completado ? 'bg-green-1' : 'bg-grey-2'"
                    >
                      <div class="row items-center q-mb-xs">
                        <q-icon name="engineering" class="q-mr-xs text-primary" />
                        <span class="text-weight-bold text-primary q-mr-sm">Responsable:</span>
                        <span class="text-dark">{{ paso.responsableNombre }}</span>
                      </div>

                      <div
                        v-if="paso.completado && paso.dato"
                        class="row items-center q-mb-xs q-mt-sm"
                      >
                        <q-icon name="info" class="q-mr-xs text-primary" />
                        <span class="text-weight-bold text-primary q-mr-sm">Dato generado:</span>
                        <span class="text-dark">{{ paso.dato }}</span>
                      </div>

                      <div
                        v-if="paso.completado && paso.comentario"
                        class="q-mt-sm text-grey-9 text-italic border-left-primary q-pl-sm"
                        style="border-left: 3px solid #1976d2"
                      >
                        "{{ paso.comentario }}"
                      </div>

                      <div v-if="!paso.completado" class="text-grey-7 q-mt-sm">
                        <q-icon name="hourglass_empty" class="q-mr-xs" /> Tarea a la espera de ser
                        procesada.
                      </div>
                    </div>
                  </q-timeline-entry>
                </q-timeline>
              </q-card-section>
            </q-card>
          </div>
        </div>

        <DialogRegistrarAvance
          v-model="mostrarDialogo"
          :pasosActuales="pasos"
          @guardar="actualizarAvances"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import DialogRegistrarAvance from 'components/rh/DialogRegistrarAvance.vue'
import { apiObtenerSeguimiento, apiActualizarAvances } from 'src/services/solicitudesService'

const route = useRoute()
const $q = useQuasar()
const mostrarDialogo = ref(false)
const cargando = ref(true)

const solicitud = ref({})
const pasos = ref([])

onMounted(async () => {
  try {
    cargando.value = true
    const data = await apiObtenerSeguimiento(route.params.id)
    solicitud.value = data
    pasos.value = data.pasos || []
  } catch (error) {
    console.error('Error al cargar el seguimiento:', error)
  } finally {
    cargando.value = false
  }
})

function abrirDialogo() {
  mostrarDialogo.value = true
}

async function actualizarAvances(avancesDelDialog) {
  try {
    const nuevosPasos = avancesDelDialog.map((av) => ({
      titulo: av.titulo,
      responsableNombre: av.responsableNombre || 'No asignado',
      completado: av.completado,
      dato: av.dato,
      comentario: av.comentario,
    }))

    // Mandamos a guardar a la BD (Servicio)
    await apiActualizarAvances(solicitud.value.idSolicitud, nuevosPasos)

    // Si tuvo éxito, actualizamos la vista
    pasos.value = nuevosPasos

    const todoCompletado = pasos.value.every((p) => p.completado)
    if (todoCompletado) {
      solicitud.value.estatusSolicitud = 'Finalizada'
    }

    mostrarDialogo.value = false

    $q.notify({
      color: 'positive',
      icon: 'check_circle',
      message: 'Avances guardados correctamente',
    })
  } catch (error) {
    console.error(error)
    $q.notify({
      color: 'negative',
      icon: 'error',
      message: 'Error al guardar los avances',
    })
  }
}
</script>
