<template>
  <div>
    <div class="text-h6 text-primary q-mb-md">Formulario de Alta</div>

    <div class="row q-col-gutter-md">
      <div class="col-12">
        <q-input
          v-model="form.nombre"
          label="Nombre completo del empleado"
          outlined
          bg-color="white"
        >
          <template v-slot:prepend><q-icon name="person" /></template>
        </q-input>
      </div>

      <div class="col-12 col-sm-6">
        <q-input
          v-model="form.curp"
          label="CURP"
          outlined
          bg-color="white"
          style="text-transform: uppercase"
        >
          <template v-slot:prepend><q-icon name="badge" /></template>
        </q-input>
      </div>

      <div class="col-12 col-sm-6">
        <q-input
          v-model="form.fechaIngreso"
          type="date"
          label="Fecha de ingreso"
          outlined
          bg-color="white"
        >
          <template v-slot:prepend><q-icon name="event" /></template>
        </q-input>
      </div>

      <div class="col-12">
        <q-select
          v-model="form.area"
          :options="areas"
          label="Área de adscripción"
          outlined
          bg-color="white"
        >
          <template v-slot:prepend><q-icon name="business" /></template>
        </q-select>
      </div>
    </div>

    <div class="row justify-end q-mt-lg">
      <q-btn
        label="Registrar Alta"
        icon="person_add"
        color="primary"
        unelevated
        class="q-px-md text-weight-bold"
        @click="submit"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['submit'])

const areas = ['TI', 'RH', 'Finanzas']

const form = ref({
  nombre: '',
  curp: '',
  area: '',
  fechaIngreso: '',
})

function submit() {
  emit('submit', { tipo: 'Alta', ...form.value })
}
</script>
