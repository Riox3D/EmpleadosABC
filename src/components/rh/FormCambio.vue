<template>
  <q-card-section>
    <!-- Buscar empleado -->
    <q-input label="Buscar empleado (ID o Nombre)" outlined @blur="buscarEmpleado" />

    <q-input
      v-model="empleado.nombre"
      label="Empleado seleccionado"
      outlined
      disable
      class="q-mt-sm"
    />

    <!-- Nueva Área -->
    <q-select
      v-model="area"
      :options="areas"
      label="Nueva Área / Gerencia"
      outlined
      class="q-mt-sm"
    />

    <!-- Jefe inmediato -->
    <q-select
      v-model="jefe"
      :options="jefes[area] || []"
      label="Jefe inmediato"
      outlined
      class="q-mt-sm"
      :disable="!area"
    />
    <div class="row justify-end">
      <q-btn
        label="Enviar solicitud"
        color="warning"
        class="q-mt-md"
        :disable="!jefe"
        @click="submit"
      />
    </div>
  </q-card-section>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['submit'])

const empleado = ref({})
const area = ref('')
const jefe = ref('')

const areas = ['TI', 'RH', 'Finanzas']

const jefes = {
  TI: ['Antonio'],
  RH: ['Laura'],
  Finanzas: ['Miguel'],
}

function submit() {
  emit('submit', {
    tipo: 'Cambio',
    empleado: empleado.value,
    nuevaArea: area.value,
    jefe: jefe.value,
  })
}
</script>
