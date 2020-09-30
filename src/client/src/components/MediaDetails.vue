<template>
  <div class="Meaning-media">
    <img
      v-if="word.imageUrl"
      :src="word.imageUrl"
      :alt="word.word"
      class="media"
    />
    <div
      v-else
      class="media not-found"
    >
      No se encontró<br/>la imagen
    </div>
    <div class="Media-iframe-wrapper media" v-if="word.videoUrl">
      <iframe
        
        :src="videoUrl"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        class=""
      >
      </iframe>
    </div>
    <div
      v-else
      class="media not-found"
    >
      No se encontró<br/>el video
    </div>
  </div>
</template>

<script>
export default {
  props: {
    word: {
      type: Object
    }
  },
  computed: {
    videoUrl() {
      if (this.word.videoUrl) {
        const videoUrl = this.word.videoUrl.match(
          new RegExp("v=(.*)")
        )[1];
        return `https://www.youtube.com/embed/${videoUrl}`;
      }
      return null;
    }
  }
}
</script>

<style>
.Meaning-media {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.Meaning-media > :nth-child(2) {
  margin-top: 10px;
}

.media {
  max-width: 290px;
  border-radius: 10px;
}

.not-found {
  text-align: center;
  font-size: 1.1em;
  padding-top: 40px;
  padding-bottom: 40px;
}

.Media-iframe-wrapper {
  overflow: hidden;
  border-radius: 10px;
}

</style>