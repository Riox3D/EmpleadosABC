<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section class="row items-center justify-between">
        <div class="text-h6">Solicitudes RH</div>
        <q-btn label="Nueva Solicitud" color="primary" @click="$router.push('/registro')" />
      </q-card-section>

      <q-separator />

      <q-card-section>
        <q-select
          v-model="filtroEstatus"
          :options="estatus"
          label="Filtrar por estatus"
          clearable
          outlined
        />
      </q-card-section>

      <TablaSolicitudes :solicitudes="solicitudesFiltradas" @ver="verSeguimiento" />
    </q-card>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import TablaSolicitudes from 'components/rh/TablaSolicitudes.vue'

const filtroEstatus = ref(null)

const estatus = ['En proceso', 'Terminada', 'Finalizada', 'Cancelada']

const solicitudes = ref([
  { id: 'SOL-001', tipo: 'Alta', estatus: 'En proceso', empleado: 'Juan Pérez' },
  { id: 'SOL-002', tipo: 'Baja', estatus: 'Finalizada', empleado: 'Ana López' },
])

const solicitudesFiltradas = computed(() => {
  if (!filtroEstatus.value) return solicitudes.value
  return solicitudes.value.filter((s) => s.estatus === filtroEstatus.value)
})

function verSeguimiento(id) {
  console.log('Seguimiento de', id)
}
</script>
