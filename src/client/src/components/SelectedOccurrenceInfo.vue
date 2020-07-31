<template>
  <div class="media-container">
    <colored-card v-if="!occurrence" class="info center-card">
      Selecciona una palabra para ver su significado
    </colored-card>
    <colored-card v-else-if="!occurrence.selectedWordObject" class="warning center-card">
      Elige un significado para <span class="word-select-meaning"> {{ occurrence.word }}</span>
      <template v-slot:actions>
        <slot name="actions"></slot>
      </template>
    </colored-card>
    <div v-else class="info-and-media-wrapper">
      <div class="word-information">
        <div class="word-information--header">
          
        </div>
        <div class="word-information--content">
          <div class="word-card">
            <div class="word-card--header">
              <h1>{{ occurrence.word }}</h1>
              <div class="word-card--actions">
                <button @click="showDropdownMenu" class="word-card--dropdown-button dropdown-button">
                  <img src="../assets/chevron-down.svg" alt="Opciones de ocurrencia" width="20px" height="20px">
                </button>
                <!-- This could be refactored into a component -->
                <ul :class="dropdownClassObject">
                  <li>
                    <button @click="emitSelectMeaning">Cambiar significado</button>
                  </li>
                  <li>
                    <button>Eliminar ocurrencia</button>
                  </li>
                  <li>
                    <button>Marcar como no visible</button>
                  </li>
                </ul>
              </div>
              
            </div>
            
            <div class="word-type">{{ occurrence.selectedWordObject.type }}</div>
            <p>{{ occurrence.selectedWordObject.definition }}</p>
            <!-- TODO: detalles desplegables -->
            <!-- TODO: menú de acciones -->
          </div>
        </div>
      </div>
      <div class="associated-media">
        <div class="image">
          <img v-if="occurrence.selectedWordObject.imageUrl"
            :src="occurrence.selectedWordObject.imageUrl" 
            :alt="occurrence.word"
            class="media"/>
          <div v-if="occurrence.selectedWordObject && !occurrence.selectedWordObject.imageUrl"
            class="media no-media-found">No hay imagen relacionada</div>
          </div>
          <div class="video">
            <iframe v-if="occurrence.selectedWordObject.videoUrl"
              :src="formattedVideoUrl" 
              frameborder="0" 
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen
              class="media">
            </iframe>
            <div v-if="occurrence.selectedWordObject && !occurrence.selectedWordObject.videoUrl"
              class="media no-media-found"
            >No hay video relacionado</div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import ColoredCard from '@/components/ColoredCard'
export default {
  components: {
    ColoredCard
  },
  data() {
    return {
      optionsDropdownActive: false
    }
  },
  props: {
    occurrence: {
      required: true,
      default: function () {
        return null;
      },
    }
  },
  computed: {
    formattedVideoUrl() {
      if (this.occurrence.selectedWordObject.videoUrl) {
        const videoUrl = this.occurrence.selectedWordObject.videoUrl.match(
          new RegExp("v=(.*)")
        )[1];
        return `https://www.youtube.com/embed/${videoUrl}`;
      }
      return null;
    },
    dropdownClassObject() {
      return {
        'word-card--dropdown-menu': true, 
        'dropdown-menu link-list': true,
        'active': this.optionsDropdownActive
      }
    }
  },
  methods: {
    showDropdownMenu() {
      this.optionsDropdownActive = !this.optionsDropdownActive;
    },
    emitSelectMeaning() {
      this.$emit('selectMeaning');
    }
  }
}
</script>

<style lang="scss">
.media-container {
  display: flex;
  padding: 0 1em;
  position: relative;
}

.media {
  width: 100%;
  height: 100%;
  border-radius: 1em;
}

.info-and-media-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.word-information {
  height: 60%;
}

.associated-media {
  height: 40%;
  display: flex;
  justify-content: space-evenly;
  .image {
    width: 40%;
  }
  .video {
    width: 40%;
  }
}
.no-media-found {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 1.2rem;
  color: #c2c2c2;
  border: 2px solid #c2c2c2;
}

.word-information--content {
  margin-top: 10%;
  display: flex;
  justify-content: center;

  .word-card {
    padding: 1em;

    .word-card--header {
      display: flex;
      align-items: start;
      position: relative;
      h1 {
        text-align: left;
        color: blue;
        font-size: 2em;
        flex: 1 1 auto;
      }

      .word-card--dropdown-button {
        font-size: 0.5em;
        padding: 0;
      }
    }

    .word-type {
      color: hsl(0, 0%, 60%);
      font-style: italic;
    }

    p {
      font-size: 1.3em;
    }
    border-radius: 10px;
    box-shadow: 0px 0px 10px 2px #c2c2c2;
    width: 70%;
  }
}

.word-information--header {
  display: flex;
  flex-flow: row-reverse;
}

.center-card {
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 5em;
  right: 5em;
  margin-top: -60px;
}

.word-select-meaning {
  font-weight: 800;
  display: block;
  text-align: center;
}

.link-list {
  list-style-type: none;
}

.link-list button {
  display: block;
  width: 100%;
  border: none;
  padding: 7px 15px 8px;
  text-align: left;
  font-size: 1rem;
  background: none;
  border-radius: 0;
}

.link-list button:hover, .link-list button:focus {
  color: inherit;
  background: #e7e8f1;
}

.dropdown-menu {
  position: absolute;
  display: none;
  padding: 5px 0;
  border-radius: 0.5em;
  box-shadow: 0px 0px 10px 2px #c2c2c2;
  background: white;
  width: auto;
  z-index: 1;
  opacity: 1;
}

.word-card--dropdown-menu {
  right: 0;
  z-index: 10;
  margin-top: 5px;
}

.dropdown-button {
  border: none;
  background: none;
  padding: 0.2em;
}

.active {
  display: block;
}


</style>