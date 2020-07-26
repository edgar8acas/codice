<template>
  <div class="media-container">
    <colored-card v-if="!occurrence" class="info center-card">
      Selecciona una palabra para ver su significado
    </colored-card>

    <div v-else-if="!occurrence.selectedWordObject" class="info-card">
      <!-- TODO: Mostrar el texto de la palabra -->
      <span class="card-body">Elige un significado para la palabra.</span>
      <slot name="select-meaning"></slot>
    </div>
    <div v-else>
      <div class="information">
        <h1>{{ occurrence.word }}</h1>
        <!-- TODO: detalles desplegables -->
        <!-- TODO: menú de acciones -->
      </div>
      <div class="associated-media">
        <div class="image">
          <img v-if="occurrence.selectedWordObject.imageUrl"
            :src="occurrence.selectedWordObject.imageUrl" 
            :alt="occurrence.word"
            class="media"/>
          <img v-if="occurrence.selectedWordObject && !occurrence.selectedWordObject.imageUrl"
            :src="require('../assets/img_placeholder.png')"
            :alt="occurrence.word"
            class="media"/>
          </div>
          <div class="video">
            <iframe v-if="formattedVideoUrl"
              :src="formattedVideoUrl" 
              frameborder="0" 
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen
              class="media">
            </iframe>
          </div>
          <div v-if="!occurrence.selectedWordObject.videoUrl"
            class="video">Sin video</div>
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
  props: {
    occurrence: {
      type: Object,
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
  }
}
</script>

<style lang="scss">
.media-container {
  display: flex;
  padding: 0 1em;
  position: relative;

  .information {
    height: 60%;
    h1 {
      text-align: center;
      font-size: 3em;
    }
  }

  .associated-media {
    height: 40%;
    display: flex;
    justify-content: space-evenly;

    .image {
      width: 40%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 1em;
      }
    }

    .video {
      width: 40%;
      iframe {
        width: 100%;
        height: 100%;
        border-radius: 1em;
      }
    }
  }
}

.center-card {
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 5em;
  right: 5em;
  margin-top: -60px;
}
</style>