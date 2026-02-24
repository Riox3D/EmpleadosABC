<template>
  <q-page class="q-pa-lg bg-grey-2">
    <q-card class="shadow-2">
      <!-- HEADER -->
      <q-card-section class="row items-center justify-between">
        <div class="text-h6 text-weight-bold">Seguimiento de Solicitud</div>

        <q-chip color="primary" text-color="white" icon="assignment">
          {{ solicitud.id }}
        </q-chip>
      </q-card-section>

      <q-separator />

      <!-- INFORMACIÓN + CHECKLIST -->
      <q-card-section class="row q-col-gutter-lg">
        <!-- IZQUIERDA -->
        <div class="col-12 col-md-6">
          <q-card flat bordered class="q-pa-md">
            <div class="text-subtitle1 text-weight-medium q-mb-md">Información</div>

            <div class="q-mb-sm">
              <div class="text-caption text-grey">Empleado</div>
              <div class="text-body1">{{ solicitud.empleado }}</div>
            </div>

            <div>
              <div class="text-caption text-grey">Tipo</div>
              <div class="text-body1">{{ solicitud.tipo }}</div>
            </div>
          </q-card>
        </div>
      </q-card-section>

      <q-separator />

      <!-- AVANCES ILUSTRATIVOS -->
      <q-card-section>
        <div class="text-subtitle1 text-weight-medium q-mb-lg">Avances</div>

        <div class="row q-col-gutter-lg">
          <div v-for="(avance, index) in avances" :key="index" class="col-12 col-md-4">
            <q-card flat bordered class="q-pa-md">
              <!-- Icono estado -->
              <div class="row items-center q-mb-md">
                <q-icon
                  :name="avance.completado ? 'check_circle' : 'pending'"
                  :color="avance.completado ? 'green' : 'orange'"
                  size="28px"
                  class="q-mr-sm"
                />
                <div class="text-weight-medium">
                  {{ avance.titulo }}
                </div>
              </div>

              <!-- Responsable -->
              <div class="q-mb-sm">
                <div class="text-caption text-grey">Responsable</div>
                <div>
                  {{ avance.responsableNombre || 'Sin asignar' }}
                </div>
              </div>

              <!-- Dato -->
              <div v-if="avance.dato" class="q-mb-sm">
                <div class="text-caption text-grey">Dato registrado</div>
                <div>{{ avance.dato }}</div>
              </div>

              <!-- Comentario -->
              <div v-if="avance.comentario">
                <div class="text-caption text-grey">Comentario</div>
                <div>{{ avance.comentario }}</div>
              </div>
            </q-card>
          </div>
        </div>
      </q-card-section>

      <!-- BOTÓN -->
      <q-card-actions align="right">
        <q-btn
          v-if="puedeRegistrar"
          color="primary"
          label="Registrar Avance"
          icon="add"
          @click="mostrarDialog = true"
        />
      </q-card-actions>
    </q-card>

    <DialogRegistrarAvance v-model="mostrarDialog" @guardar="registrarAvance" />
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import DialogRegistrarAvance from 'components/rh/DialogRegistrarAvance.vue'

const puedeRegistrar = true

const mostrarDialog = ref(false)

const solicitud = ref({
  id: 'SOL-001',
  empleado: 'Carlos Ramirez',
  tipo: 'Alta',
})

function registrarAvance(data) {
  avances.value = data
}

const avances = ref([
  {
    titulo: 'Creación de correo',
    completado: false,
    responsableid: null,
    responsableNombre: '',
    dato: '',
    comentario: '',
  },
  {
    titulo: 'Creación de cuenta A.D',
    completado: false,
    responsableid: null,
    responsableNombre: '',
    dato: '',
    comentario: '',
  },
  {
    titulo: 'Creación y entrega de credencial',
    completado: false,
    responsableid: null,
    responsableNombre: '',
    dato: '',
    comentario: '',
  },
])
</script>
