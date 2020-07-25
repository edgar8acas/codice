<template>
  <div class="media-container">
    <div v-if="!occurrence.selectedWordObject" class="alert-without-associated-meaning">
      <span style="display:block; margin-bottom: 1em">¡Selecciona un significado!</span>
      <slot name="select-meaning"></slot>
    </div>
    <div v-else class="associated-media">
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
</template>

<script>
export default {
  props: {
    occurrence: {
      type: Object,
      required: true,
      default: function () {
        return {};
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
  flex-flow: column;
  .video {
    text-align: center;
    height: 50%;

    iframe {
      width: 400px;
      height: 80%;
      border-radius: 1em;
    }
  }
  
  .image {
    height: 50%;
    img {
      width: 400px;
      display: block;
      border-radius: 1em;
      margin: 0 auto;
      height: 80%;
    }
  }
}

.media {
  border: 0.5rem solid #c2c2c2;
}

.associated-media {
  height: 100%;
}
.alert-without-associated-meaning {
  text-align: center;
  vertical-align: middle;
  height: 100%;
  line-height: 100%;
  font-size: 1.5em;
  padding-top: 50%;
  border: 0.5rem solid #c2c2c2;
  border-radius: 20px;
}
</style>