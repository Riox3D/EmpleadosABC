<template>
  <q-dialog v-model="dialogModel">
    <q-card style="min-width: 600px">
      <q-card-section class="text-h6 text-weight-bold"> Registrar Avances </q-card-section>

      <q-separator />

      <q-card-section class="q-pa-lg">
        <div v-for="(avance, index) in formAvances" :key="index" class="q-mb-xl">
          <div class="text-subtitle1 text-weight-medium q-mb-sm">
            {{ avance.titulo }}
          </div>

          <q-checkbox v-model="avance.completado" label="Marcar como completado" class="q-mb-md" />

          <q-select
            v-model="avance.responsableId"
            :options="agentes"
            option-label="nombre"
            option-value="id"
            label="Responsable"
            outlined
            emit-value
            map-options
            class="q-mb-md"
          />

          <q-input v-model="avance.dato" :label="avance.labelDato" outlined class="q-mb-md" />

          <q-input
            v-model="avance.comentario"
            type="textarea"
            label="Comentario"
            outlined
            autogrow
          />

          <q-separator spaced />
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" @click="dialogModel = false" />
        <q-btn color="primary" label="Guardar" @click="guardar" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
0
const props = defineProps({
  modelValue: Boolean,
})

const emit = defineEmits(['update:modelValue', 'guardar'])

const dialogModel = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const formAvances = ref([
  {
    titulo: 'Creación de correo',
    labelDato: 'Correo creado',
    completado: false,
    responsableid: null,
    responsableNombre: '',
    dato: '',
    comentario: '',
  },
  {
    titulo: 'Creación de cuenta A.D',
    labelDato: 'Cuenta A.D creada',
    completado: false,
    responsableid: null,
    responsableNombre: '',
    dato: '',
    comentario: '',
  },
  {
    titulo: 'Creación y entrega de credencial',
    labelDato: 'Folio o identificador',
    completado: false,
    responsableid: null,
    responsableNombre: '',
    dato: '',
    comentario: '',
  },
])

const agentes = ref([
  { id: 1, nombre: 'Juan Pérez', tipo: 'alta' },
  { id: 2, nombre: 'María López', tipo: 'alta' },
  { id: 3, nombre: 'Carlos Díaz', tipo: 'baja' },
])

function guardar() {
  const avancesProcesados = formAvances.value.map((av) => {
    const agente = agentes.value.find((a) => a.id === av.responsableId)
    return {
      ...av,
      responsableNombre: agente ? agente.nombre : '',
    }
  })

  emit('guardar', avancesProcesados)
  dialogModel.value = false
}
</script>
