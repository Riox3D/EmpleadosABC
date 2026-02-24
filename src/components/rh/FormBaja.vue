<template>
  <q-card-section>
    <q-input label="Buscar empleado (ID o Nombre)" outlined @blur="buscarEmpleado" />

    <q-input
      v-model="empleado.nombre"
      label="Empleado seleccionado"
      outlined
      disable
      class="q-mt-sm"
    />

    <q-input v-model="fechaBaja" type="date" label="Fecha de baja" outlined class="q-mt-sm" />
    <div class="row justify-end">
      <q-btn
        label="Enviar solicitud"
        color="negative"
        class="q-mt-md"
        :disable="!empleado.nombre"
        @click="submit"
      />
    </div>
  </q-card-section>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['submit'])

const empleado = ref({})
const fechaBaja = ref('')

function buscarEmpleado() {
  // Simulación de búsqueda
  empleado.value = {
    id: 'EMP-1234',
    nombre: 'Juan Pérez',
  }
}

function submit() {
  emit('submit', {
    tipo: 'Baja',
    empleado: empleado.value,
    fechaBaja: fechaBaja.value,
  })
}
</script>
