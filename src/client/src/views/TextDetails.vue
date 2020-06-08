<template>
  <section class="central">
    <div class="details side-info">
      <h2>Detalles del texto</h2>
      <p class="details-box">
        <span class="detail-label">ID</span>: {{ text.textId }} <br>
        <span class="detail-label">Título</span>: {{ text.title }} <br>
        <span class="detail-label">Categoría</span>: {{ text.category }} <br>
        <span class="detail-label">Grado</span>: {{ text.grade }} <br>
        <span class="detail-label">Estado</span>: {{ status }} <br>
        <span class="detail-label">Añadido por</span>: {{ text.addedBy }} <br> <br>
        <span class="detail-label">Contenido</span> <br>
        <router-link 
          :to="{ name: 'ProcessText', params: { id: text.textId }}"
          v-slot="{ href, navigate }"
          v-if="!processed">
          <a :href="href" @click="navigate" class="btn-primary"> Obtener </a>
        </router-link>
      </p>
    </div>
    <div class="template">
      <h2 class="title">{{ text.title }}</h2>
      <text-content class="content" v-if="showContent" @showWordInfo="showWordInfo"></text-content>
    </div>
    <word-details class="word-details side-info" :wordId="currentWordId">
    </word-details>
  </section>
</template>

<script>
import TextContent from '@/components/TextContent';
import WordDetails from '@/components/WordDetails';

export default {
  components: {
    TextContent,
    WordDetails
  },
  data() {
    return {
      textId: this.$route.params.id,
      showContent: false,
      currentWordId: null
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
  },
  async created() {
    await this.$store.dispatch('getCurrentTemplate', this.text.textId);
  },
  beforeDestroy() {
    this.$store.dispatch('resetCurrentWord');
  },
  methods: {
    displayContent() {
      this.showContent = true;
    },
    showWordInfo(wordId) {
      this.currentWordId = wordId
    }
  }
}
</script>

<style lang="scss">
.identified {
  color: blue;
}
.central {
  display: grid;
  grid-template-columns: 20% 40% 20%;
  justify-content: center;
  column-gap: 0.5em;
}

.template {
  border: 1px solid #c2c2c2;
  border-radius: 5px;
}

.content {
  overflow: scroll;
  overflow-x: hidden;
  font-size: 1.5em;
  margin: 0 10px;
  text-align: left;
  line-height: 160%;
}

.side-info {
  border-radius: 5px;
  border: 1px solid #c2c2c2;
}

.details-box {
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