<template>
  <div>
    <div class="text-h6 text-primary q-mb-md">Formulario de Alta</div>

    <div class="row q-col-gutter-md">
      <div class="col-12">
        <q-input v-model="form.claveEmpleado" label="Clave del Empleado (HUMAN) *" outlined
          :rules="[val => val && val.length > 0 || 'La clave es obligatoria']">
          <template v-slot:prepend><q-icon name="key" /></template>
        </q-input>
      </div>

      <div class="col-12">
        <q-input v-model="form.nombre" label="Nombre completo" outlined>
          <template v-slot:prepend><q-icon name="person" /></template>
        </q-input>
      </div>

      <div class="col-12">
        <q-input v-model="form.observaciones" label="Observaciones adicionales" type="textarea" outlined rows="2" />
      </div>
    </div>

    <div class="row justify-end q-mt-lg">
      <q-btn label="Registrar Alta" color="primary" @click="submit" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['submit'])

const form = ref({
  claveEmpleado: '',
  nombre: '',
  curp: '',
  area: '',
  fechaIngreso: '',
  observaciones: ''
})

function submit() {
  
  if (form.value.claveEmpleado) {
    emit('submit', { ...form.value })
  }
}
</script>