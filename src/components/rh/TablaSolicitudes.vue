<template>
  <q-table
    :rows="solicitudes"
    :columns="columns"
    row-key="id"
    flat
    bordered
    class="my-sticky-header-table"
    table-header-class="bg-grey-2 text-weight-bolder text-grey-9"
  >
    <template v-slot:body-cell-estatus="props">
      <q-td :props="props">
        <q-chip
          :color="getColorEstatus(props.row.estatus)"
          text-color="white"
          dense
          class="text-weight-bold"
          size="sm"
        >
          {{ props.row.estatus }}
        </q-chip>
      </q-td>
    </template>

    <template v-slot:body-cell-acciones="props">
      <q-td :props="props">
        <q-btn
          icon="visibility"
          dense
          round
          flat
          color="primary"
          @click="emit('ver', props.row.id)"
        >
          <q-tooltip class="bg-primary" :offset="[10, 10]"> Ver seguimiento </q-tooltip>
        </q-btn>
      </q-td>
    </template>

    <template v-slot:no-data>
      <div class="full-width row flex-center text-grey-6 q-pa-md">
        <q-icon size="2em" name="sentiment_dissatisfied" class="q-mr-sm" />
        <span>No se encontraron solicitudes.</span>
      </div>
    </template>
  </q-table>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  solicitudes: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['ver'])

const getColorEstatus = (estatus) => {
  const colores = {
    'En proceso': 'warning',
    Terminada: 'info',
    Finalizada: 'positive',
    Cancelada: 'negative',
  }
  return colores[estatus] || 'grey'
}

const columns = [
  {
    name: 'id',
    label: 'ID',
    field: 'id',
    align: 'left',
    classes: 'text-weight-bold text-primary',
  },
  { name: 'tipo', label: 'Tipo', field: 'tipo', align: 'left' },
  { name: 'empleado', label: 'Empleado', field: 'empleado', align: 'left' },
  { name: 'estatus', label: 'Estatus', field: 'estatus', align: 'center' },
  { name: 'acciones', label: 'Acciones', field: '', align: 'center', sortable: false },
]
</script>

<style scoped>
.q-table__container {
  border-radius: 8px;
}
</style>
