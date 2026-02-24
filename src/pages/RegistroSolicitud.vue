<template>
  <q-page class="q-pa-md">
    <q-card>
      <q-card-section class="text-h6"> Registro de Solicitud </q-card-section>

      <q-card-section>
        <q-select v-model="tipoMovimiento" :options="tipos" label="Tipo de movimiento" outlined />
      </q-card-section>

      <FormAlta v-if="tipoMovimiento === 'Alta'" @submit="enviarSolicitud" />
      <FormBaja v-if="tipoMovimiento === 'Baja'" @submit="enviarSolicitud" />
      <FormCambio v-if="tipoMovimiento === 'Cambio'" @submit="enviarSolicitud" />
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import FormAlta from 'components/rh/FormAlta.vue'
import FormBaja from 'components/rh/FormBaja.vue'
import FormCambio from 'components/rh/FormCambio.vue'

const tipoMovimiento = ref(null)
const tipos = ['Alta', 'Baja', 'Cambio']

function enviarSolicitud(data) {
  console.log('Solicitud enviada', data)
}
</script>
