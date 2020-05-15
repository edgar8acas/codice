<template>
  <div class="text">
    <h2>Detalles del texto</h2>
    <p class="text-details">
      <span class="detail-label">ID</span>: {{ text.textId }} <br>
      <span class="detail-label">Título</span>: {{ text.title }} <br>
      <span class="detail-label">Categoría</span>: {{ text.category }} <br>
      <span class="detail-label">Grado</span>: {{ text.grade }} <br>
      <span class="detail-label">Estado</span>: {{ status }} <br>
      <span class="detail-label">Añadido por</span>: {{ text.addedBy }} <br> <br>
      <span class="detail-label">Palabras</span> <br>
      <router-link 
        :to="{ name: 'ProcessText', params: { id: textId }}"
        v-slot="{ href, navigate }"
        v-if="!processed">
        <a :href="href" @click="navigate" class="btn-primary"> Obtener </a>
      </router-link>
      <a class="btn-primary" @click.prevent="save" v-if="processed">Ver</a>
    </p>
    
  </div>
</template>

<script>

export default {
  data() {
    return {
      textId: this.$route.params.id
    }
  },
  computed: {
    text() {
      return this.$store.state.texts.find(
        text => text.textId === this.textId
      )
    },
    processed() {
      return this.text.status === 'processed' ||
             this.text.status === 'incomplete' 
             ? true : false
    },
    status() {
      switch(this.text.status) {
        case 'processed': 
          return 'Con palabras';
        case 'unprocessed': 
          return 'Sin palabras';
        case 'incomplete': 
          return 'Falta multimedia';
        default:
          return 'Desconocido'
      }
    }
  }
}
</script>

<style lang="scss">
.text {
  max-width: 300px;
  border-radius: 5px;
  border: 1px solid #c2c2c2;
}

.text-details {
  min-height: 200px;
  border-radius: 5px;
  border-top: 1px solid #c2c2c2;
  padding: 10px;
  box-sizing: border-box;
  text-align: left;
}

.detail-label {
  font-weight: bold;
}

.btn-primary {
  display: inline-block;
  text-transform: uppercase;
  background-color: #42B983;
  border-radius: 3px;
  box-sizing: border-box;
  padding: 5px 10px;
  text-decoration: none;
  font-size: 0.9em;
}

.btn-primary:link {
  color: white;
}

.btn-primary:visited {
  color: white;
}

.btn-primary:hover {
  background-color: #26694B;
}

</style>