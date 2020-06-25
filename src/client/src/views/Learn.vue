<template>
  <section class="central">
    <div class="side-info">
      <h2 class="section-title">Diccionario de la lección</h2>
      <div class="dictionary">
        Aprendidas ({{ learntWords.length }})
        <ul>
          <li
            class="learned"
            v-for="dictionaryWord in learntWords"
            :key="dictionaryWord.dictionaryId"
          >{{dictionaryWord.Word.word}}</li>
        </ul>
        Por aprender ({{ unlearntWords.length }})
        <ul>
          <li
            class="unlearned"
            v-for="dictionaryWord in unlearntWords"
            :key="dictionaryWord.dictionaryId"
          >{{dictionaryWord.Word.word}}</li>
        </ul>
      </div>
    </div>
    <div class="learn-view">
      <h2>Los bancos</h2>
      <text-content class="content" :isChoosing="false" @changeOccurrence="changeOccurrence"></text-content>

      <div class="media-container">
        <img v-if="occurrence.Word.imageUrl"
          :src="occurrence.Word.imageUrl" 
          :alt="occurrence.word" 
          class="image" />
        <img v-if="!occurrence.Word.imageUrl"
          :src="require('../assets/img_placeholder.png')"
          :alt="occurrence.word" 
          class="image" />
        <iframe v-if="formattedVideoUrl"
          width="560" height="315" 
          :src="formattedVideoUrl" 
          frameborder="0" 
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen></iframe>
        <div v-if="!occurrence.Word.videoUrl"
          class="video">Sin video</div>
      </div>
    </div>
    <div class="side-info">
      <h2 class="section-title">{{occurrence.word || 'Información de palabra'}}</h2>
      <mark-learned :occurrence="occurrence"></mark-learned>
    </div>
  </section>
</template>

<script>
import TextContent from "@/components/TextContent";
import MarkLearned from "@/components/MarkLearned";
import { mapState, mapGetters } from "vuex";
export default {
  components: {
    TextContent,
    MarkLearned
  },
  data() {
    return {
      textId: this.$route.params.id,
      occurrence: {
        Word: {}
      },
      isLearnt: false
    };
  },
  computed: {
    ...mapState(["occurrences"]),
    ...mapGetters(["learntWords", "unlearntWords"]),
    formattedVideoUrl() {
      if(this.occurrence.Word.videoUrl) {
        const videoUrl = this.occurrence.Word.videoUrl.match(new RegExp('v=(.*)'))[1];
        return `https://www.youtube.com/embed/${videoUrl}`;
      }
      return null;
    }
  },
  async mounted() {
    await this.$store.dispatch("getTemplateByTextId", this.textId);
  },
  methods: {
    changeOccurrence(start) {
      this.occurrence = this.occurrences.find(o => o.start === start);
    }
  }
};
</script>

<style lang="scss" scoped>
.central {
  display: grid;
  grid-template-columns: 20% 40% 20%;
  justify-content: center;
  column-gap: 0.5em;
}
.side-info {
  border-radius: 5px;
  border: 1px solid #c2c2c2;
}

.btn {
  margin: 5px;
  width: 150px;
  height: 30px;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  font-size: 1em;
  border: none;
  border-radius: 5px;
}

.btn-learned {
  background-color: green;
}

.btn-unlearned {
  background-color: red;
}
.dictionary {
  text-align: left;
  margin-left: 20px;
  margin-right: 20px;
}

.inline-word.ready {
  color: blue;
}
ul {
  list-style-type: none;
  padding: 0;
  > * {
    display: block;
    text-align: left;
    border: 1px solid #c2c2c2;
    padding: 5px;
    margin-bottom: 5px;
    border-radius: 5px;
  }
  .learned {
    background-color: #b3ffb3;
  }
  .unlearned {
    background-color: #fff3b3;
  }
}
.content {
  height: 400px;
  overflow: scroll;
  overflow-x: hidden;
  font-size: 1.5em;
  margin: 0 10px;
  text-align: left;
  line-height: 160%;
}


.media-container {
  display: flex;
  flex-flow: row nowrap;
  height: 200px;
  margin-top: 20px;
  > * {
    flex-grow: 1;
    height: 100%;
  }
  .video {
  //color: red;
  text-align: center;
  //border: 1px solid red;
  }
  .image {
    //border: 1px solid blue;
  }
}
</style>