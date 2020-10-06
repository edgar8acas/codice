<template>
  <div class="Meaning-list-item">
    <div class="Meaning-info">
      <h2 class="Meaning-word">
        {{ meaning.word }}
      </h2>
      <span class="Meaning-type">{{ meaning.type }}</span>
      <span class="Meaning-definition">{{ meaning.definition }}</span>
    </div>
    <div class="Meaning-media">
        <img
          v-if="meaning.imageUrl"
          :src="meaning.imageUrl"
          :alt="meaning.word"
          class="media"
        />
        <div
          v-else
          class="media not-found"
        >
          No se encontró<br/>la imagen
        </div>
        <div class="Media-iframe-wrapper media" v-if="meaning.videoUrl">
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
  </div>
</template>

<script>
export default {
  props: {
    //A meaning its just a word, but the naming makes more sense in this context.
    meaning: Object
  },
  computed: {
    videoUrl() {
      if (this.meaning.videoUrl) {
        const videoUrl = this.meaning.videoUrl.match(
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
.Meaning-list-item {
  box-shadow: 0px 0px 1px 1px #c2c2c2;
  border-radius: 5px;
  margin: 1.5em;
  padding: 10px 10px;
  cursor: pointer;
  display: flex;
}

.Meaning-info {
  flex: 1 1;
}

.Meaning-word {
  color: blue;
  margin-bottom: 0;
}

.Meaning-type {
  display: block;
  color: hsl(0, 0%, 60%);
  margin-bottom: 1em;
}

.Meaning-definition {
  display: block;
  font-size: 1.2em;
}

.Meaning-media {
  flex: 1 1;
  display: flex;
}

.Meaning-media > :nth-child(2) {
  margin-left: 10px;
}

.media {
  flex: 1 1;
  width: 50%;
  border-radius: 10px;
}

.not-found {
  text-align: center;
  font-size: 1.1em;
  padding-top: 40px;
  padding-bottom: 40px;
}

.Media-iframe-wrapper {
  flex: 1 1;
  position: relative;
  overflow: hidden;
  padding-top: 56.25%;
  border-radius: 10px;
}

.Media-iframe-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

</style>