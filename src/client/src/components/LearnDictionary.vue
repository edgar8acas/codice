<template>
  <div class="dictionary">
    <div class="dictionary--word-list">
      <span
        v-for="word in dictionary"
        :key="word.dictionaryId"
        :class="['dictionary-word', { learned: word.isLearned }]"
      >
        {{ word.selectedWordObject.word }}
        <!-- Dev purposes -->
        <span v-if="development">
          <sub style="color: white;">{{ "w" + word.wordId }}</sub>
        </span>
      </span>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["dictionary", "development"]),
  },
};
</script>

<style lang="scss" scoped>
.dictionary--word-list {
  display: inline-flex;
  flex-wrap: wrap;
}

.dictionary-word {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  padding: 0.6em 0.9em;
  margin-right: 0.5em;
  margin-bottom: 0.5em;
  background-color: #ff3737;
  border-radius: 5px;
  cursor: pointer;

  &.learned {
    background-color: hsl(197, 71%, 46%);
  }
}
</style>
