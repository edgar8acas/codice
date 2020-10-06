<template>
  <div class="mark-learnt-box">
    <label for="learnt">¿Aprendido?</label> <br />
    <input type="checkbox" name="" id="learnt" v-model="isLearnt" />
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
    },
  },
  data() {
    return {
      isLearnt: null,
      oldOccurrenceId: null,
    };
  },
  watch: {
    occurrence(newVal, oldVal) {
      this.isLearnt = this.occurrence.dictionaryWord.isLearned;
      this.oldOccurrenceId = oldVal.occurrenceId;
    },
    isLearnt() {
      console.log(
        "watcher entered",
        "new: " + this.occurrence.occurrenceId,
        "old: " + this.oldOccurrenceId
      );
      if (this.occurrence.occurrenceId === this.oldOccurrenceId) {
        console.log("dispatch entered");
        this.$store.dispatch(
          "changeLearntStatus",
          this.occurrence.dictionaryWord
        );
      } else {
        console.log("else dispatch");
        this.oldOccurrenceId = this.occurrence.occurrenceId;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.mark-learnt-box {
  text-align: center;
}
</style>
