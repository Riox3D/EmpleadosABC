<template>
  <q-page class="q-pa-lg bg-grey-1">
    <div class="row justify-center">
      <div class="col-12 col-lg-10">
        <q-card class="shadow-3" style="border-radius: 12px">
          <q-card-section class="bg-primary text-white row items-center justify-between q-pa-md">
            <div class="row items-center q-gutter-sm">
              <q-icon name="people_alt" size="md" />
              <div class="text-h6 text-weight-bold">Solicitudes de RH</div>
            </div>

            <q-btn
              label="Nueva Solicitud"
              icon="add"
              color="white"
              text-color="primary"
              unelevated
              rounded
              class="text-weight-bold"
              @click="$router.push('/registro')"
            />
          </q-card-section>

          <q-card-section class="bg-grey-2 q-py-sm q-px-md row items-center justify-between">
            <div class="text-subtitle2 text-grey-8">
              Gestiona y da seguimiento a las solicitudes
            </div>

            <div class="row q-gutter-sm" style="min-width: 250px">
              <q-select
                v-model="filtroEstatus"
                :options="estatus"
                label="Filtrar por estatus"
                clearable
                outlined
                dense
                options-dense
                bg-color="white"
                class="full-width"
              >
                <template v-slot:prepend>
                  <q-icon name="filter_alt" color="primary" />
                </template>
              </q-select>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-section class="q-pa-none">
            <div class="q-pa-md relative-position">
              <q-inner-loading :showing="cargando">
                <q-spinner-gears size="50px" color="primary" />
              </q-inner-loading>
              <TablaSolicitudes :solicitudes="solicitudesFiltradas" @ver="verSeguimiento" />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import TablaSolicitudes from 'components/rh/TablaSolicitudes.vue'
import { apiObtenerSolicitudes } from 'src/services/solicitudesService'

const router = useRouter()

const filtroEstatus = ref(null)
const estatus = ['En proceso', 'Terminada', 'Finalizada', 'Cancelada']

const solicitudes = ref([])
const cargando = ref(true)

const solicitudesFiltradas = computed(() => {
  if (!filtroEstatus.value) return solicitudes.value
  return solicitudes.value.filter((s) => s.estatusSolicitud === filtroEstatus.value)
})

onMounted(async () => {
  try {
    cargando.value = true
    solicitudes.value = await apiObtenerSolicitudes()
  } catch (error) {
    console.error('Error al cargar solicitudes:', error)
  } finally {
    cargando.value = false
  }
})

function verSeguimiento(idSolicitud) {
  router.push(`/seguimiento/${idSolicitud}`)
}
</script>
