<template>
  <q-dialog v-model="dialogModel" persistent>
    <q-card style="min-width: 650px; border-radius: 12px" class="shadow-4">
      <q-card-section class="bg-primary text-white row items-center q-pa-md">
        <q-icon name="playlist_add_check" size="md" class="q-mr-sm" />
        <div class="text-h6 text-weight-bold">Registrar Avances de Solicitud</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup color="white" />
      </q-card-section>

      <q-separator />

      <q-card-section class="q-pa-lg scroll" style="max-height: 70vh">
        <div
          v-for="(avance, index) in formAvances"
          :key="index"
          class="q-mb-lg bg-grey-1 q-pa-md rounded-borders"
        >
          <div class="row items-center justify-between q-mb-md">
            <div class="text-subtitle1 text-weight-bold text-primary">
              <q-icon name="task_alt" size="sm" class="q-mr-xs" /> {{ avance.titulo }}
            </div>
            <q-checkbox
              v-model="avance.completado"
              label="Marcar como completado"
              color="positive"
              keep-color
            />
          </div>

          <div class="row q-col-gutter-md">
            <div class="col-12 col-sm-6">
              <q-select
                v-model="avance.responsableId"
                :options="agentes"
                option-label="nombre"
                option-value="id"
                label="Responsable asignado"
                outlined
                emit-value
                map-options
                disable
                filled
              >
                <template v-slot:prepend><q-icon name="engineering" /></template>
              </q-select>
            </div>

            <div class="col-12 col-sm-6">
              <q-input
                v-model="avance.dato"
                :label="avance.labelDato"
                outlined
                bg-color="white"
                :disable="!avance.completado"
              >
                <template v-slot:prepend><q-icon name="info" /></template>
              </q-input>
            </div>

            <div class="col-12">
              <q-input
                v-model="avance.comentario"
                type="textarea"
                label="Comentarios u observaciones"
                outlined
                bg-color="white"
                rows="2"
                autogrow
              >
                <template v-slot:prepend><q-icon name="chat" /></template>
              </q-input>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right" class="q-pa-md bg-grey-2">
        <q-btn flat label="Cancelar" color="grey-8" class="text-weight-bold" v-close-popup />
        <q-btn
          color="primary"
          icon="save"
          label="Guardar Avances"
          unelevated
          class="q-px-md text-weight-bold"
          @click="guardar"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  modelValue: Boolean,
})

const emit = defineEmits(['update:modelValue', 'guardar'])

const dialogModel = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const agentes = ref([
  { id: 1, nombre: 'Juan Pérez', tipo: 'alta' },
  { id: 2, nombre: 'María López', tipo: 'alta' },
  { id: 3, nombre: 'Carlos Díaz', tipo: 'baja' },
])

const formAvances = ref([
  {
    titulo: 'Creación de correo',
    labelDato: 'Correo creado',
    completado: false,
    responsableId: 1, // Pre-asignado a Juan Pérez
    responsableNombre: '',
    dato: '',
    comentario: '',
  },
  {
    titulo: 'Creación de cuenta A.D',
    labelDato: 'Cuenta A.D creada',
    completado: false,
    responsableId: 2, // Pre-asignado a María López
    responsableNombre: '',
    dato: '',
    comentario: '',
  },
  {
    titulo: 'Creación y entrega de credencial',
    labelDato: 'Folio o identificador',
    completado: false,
    responsableId: 1, // Pre-asignado a Juan Pérez
    responsableNombre: '',
    dato: '',
    comentario: '',
  },
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
