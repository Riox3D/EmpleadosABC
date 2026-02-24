<template>
  <q-table :rows="solicitudes" :columns="columns" row-key="id" bordered flat>
    <template v-slot:body-cell-acciones>
      <q-td align="center">
        <q-btn icon="visibility" dense flat color="primary" @click="$router.push('/seguimiento')" />
      </q-td>
    </template>
  </q-table>
</template>

<script setup>
defineProps({
  solicitudes: {
    type: Array,
    required: true,
  },
})

const columns = [
  { name: 'id', label: 'ID', field: 'id' },
  { name: 'tipo', label: 'Tipo', field: 'tipo' },
  { name: 'empleado', label: 'Empleado', field: 'empleado' },
  { name: 'estatus', label: 'Estatus', field: 'estatus' },
  { name: 'acciones', label: 'Acciones', field: 'acciones' },
]
</script>
