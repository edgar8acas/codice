<template>
  <div>
    <section class="central">
      <div class="side-info ">
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
        <text-content 
          class="content"
          :isChoosing="false" 
          @changeOccurrence="changeOccurrence"
        ></text-content>
        
        
        <div class="media-container">
          <div 
            class="image"
            :style="{ backgroundImage: 'url(' + require('@/assets/img_placeholder.png') + ')'}"
          >
            
          </div>
          <div class="video">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
      <g><g><g>
			<path d="M256,0C114.833,0,0,114.844,0,256s114.833,256,256,256s256-114.844,256-256S397.167,0,256,0z M256,490.667     C126.604,490.667,21.333,385.396,21.333,256S126.604,21.333,256,21.333S490.667,126.604,490.667,256S385.396,490.667,256,490.667     z"/>
			<path d="M357.771,247.031l-149.333-96c-3.271-2.135-7.5-2.25-10.875-0.396C194.125,152.51,192,156.094,192,160v192     c0,3.906,2.125,7.49,5.563,9.365c1.583,0.865,3.354,1.302,5.104,1.302c2,0,4.021-0.563,5.771-1.698l149.333-96     c3.042-1.958,4.896-5.344,4.896-8.969S360.813,248.99,357.771,247.031z M213.333,332.458V179.542L332.271,256L213.333,332.458z"/>
		</g></g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g>
</svg>
          </div>
        </div>
      </div>
      <div class="side-info">
        <h2 class="section-title">{{occurrence.word  || 'Información de palabra'}}</h2>
        <mark-learned :occurrence="occurrence"></mark-learned>
      </div>
    </section>
  </div>
</template>

<script>
import TextContent from '@/components/TextContent';
import MarkLearned from '@/components/MarkLearned';
import { mapState, mapGetters } from 'vuex';
export default {
  components: {
    TextContent,
    MarkLearned
  },
  data() {
    return {
      textId: this.$route.params.id,
      occurrence: {},
      isLearnt: false,
    }
  },
  computed: {
    ...mapState([
      'occurrences'
    ]),
    ...mapGetters([
      'learntWords', 'unlearntWords'
    ]),
  },
  async mounted() {
    await this.$store.dispatch('getTemplateByTextId', this.textId);
  },
  methods: {
    changeOccurrence(start) {
      this.occurrence = this.occurrences.find(
        o => o.start === start
      )
    }
  }
}
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

.video {
  display: flex;
  
  > * {
    margin: auto;
    width: 100px;
  }
}
.media-container {
  display: flex;
  flex-flow: row nowrap;
  height: 400px;
  > * {
    max-height: 300px;
    flex-grow: 1;
  }
  .image {
    background-size: cover;
    border-radius: 5px;
  }
}

</style>