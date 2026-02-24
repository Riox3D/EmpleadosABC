<template>
  <q-card-section>
    <q-input v-model="form.nombre" label="Nombre del empleado" outlined class="q-mt-sm" />
    <q-select
      v-model="form.area"
      :options="areas"
      label="Área / Gerencia"
      outlined
      class="q-mt-sm"
    />
    <q-input
      v-model="form.fechaIngreso"
      type="date"
      label="Fecha de ingreso"
      outlined
      class="q-mt-sm"
    />
    <div class="row justify-end">
      <q-btn label="Enviar solicitud" color="primary" class="q-mt-md" @click="submit" />
    </div>
  </q-card-section>
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['submit'])

const areas = ['TI', 'RH', 'Finanzas']

const form = ref({
  nombre: '',
  area: '',
  fechaIngreso: '',
})

function submit() {
  emit('submit', { tipo: 'Alta', ...form.value })
}
</script>
