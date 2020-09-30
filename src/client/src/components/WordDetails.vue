<template>
  <div>
    <div class="related-words--header">
      <h2>
        {{ selected || "Detalles de palabra" }}
      </h2>
      <button
        class="related-words--refresh-meanings"
        @click="GET_MEANINGS_FOR_WORD(selected)"
      >
        <img :src="require('../assets/refresh-ccw.svg')" />
      </button>
    </div>

    <div class="related-words--list">
      <div v-if="meanings.length === 0">
        No hay definiciones para la ocurrencia
      </div>
      <div v-else-if="selection">
        Selecciona un significado para la ocurrencia
      </div>
      <div v-else>
        Significados disponibles
      </div>
      <label
        v-for="word in meanings"
        :key="word.wordId"
        class="related-words--list-item radiobutton"
      >
        <input
          v-if="selection"
          type="radio"
          name="words-group"
          v-model="picked"
          :id="'word-' + word.wordId"
          :value="'word-' + word.wordId"
          placeholder='"Español" ó "Conocimiento del medio"'
        />
        <img
          v-if="word.imageUrl"
          :src="word.imageUrl"
          :alt="word.word"
          class="related-words--media"
        />
        <img
          v-else
          :src="require('../assets/img_placeholder.png')"
          class="related-words--media"
        />
        <div class="related-words--item-info">
          <div class="item-info--text">
            <span class="item-info--definition">
              {{ word.definition || "Definición..." }}
            </span>
            <span class="item-info--type">{{ word.type || "Tipo..." }}</span>
            <!-- Dev purposes -->
            <span v-if="development">
              <span class="item-info--type">{{
                word.wordId || "Tipo..."
              }}</span>
            </span>
          </div>
        </div>
        <span class="checkmark" v-if="selection"></span>
        <button
          class="related-words--delete"
          v-if="!selection"
          @click="DELETE_MEANING(word)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-trash-2"
          >
            <polyline points="3 6 5 6 21 6"></polyline>
            <path
              d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
            ></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </button>
      </label>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { wordMeanings } from "./../mixins/wordMeanings";

import {
  UPDATE_OCCURRENCE,
  GET_MEANINGS_FOR_WORD,
  DELETE_MEANING,
} from "./../store/action-types";

export default {
  props: {
    selection: {
      type: Boolean,
      default: false,
    },
  },
  mixins: [ wordMeanings ],
  data() {
    return {
      picked: "",
      markedStatus: "",
    };
  },
  computed: {
    ...mapState(["development"]),
  },
  watch: {
    occurrence() {
      this.picked = "word-" + this.occurrence.selectedWordId;
      this.markedStatus = this.occurrence.markedStatus;
    },
    async picked(newVal) {
      if (newVal === "word-" + this.occurrence.selectedWordId) return;
      await this[UPDATE_OCCURRENCE]({
        ...this.occurrence,
        selectedWordId: Number(newVal.substring(5)),
      });
      this.$emit("changedMeaning");
    },
  },
  methods: {
    ...mapActions([UPDATE_OCCURRENCE, DELETE_MEANING]),
    ...mapActions([GET_MEANINGS_FOR_WORD]),
  },
};
</script>

<style lang="scss">
.related-words--header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.related-words--refresh-meanings {
  border: none;
  background: none;
  padding: 0.1em;
}

.related-words--list {
  display: flex;
  flex-flow: column nowrap;
}

.related-words--list-item {
  height: 60px;
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  padding: 5px;
  margin-bottom: 5px;
}

.radiobutton {
  position: relative;
}

.radiobutton > input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 0;
  right: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 9999px;
}

.radiobutton:hover input ~ .checkmark {
  background-color: #ccc;
}

.radiobutton input:checked ~ .checkmark {
  background-color: #2196f3;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.radiobutton input:checked ~ .checkmark:after {
  display: block;
}

.radiobutton .checkmark:after {
  top: 9px;
  left: 9px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
}

.related-words--list-item > .checkmark {
  position: absolute;
}

.related-words--media {
  width: 50px;
  height: 50px;
  border-radius: 3px;
}

.related-words--item-info {
  margin-left: 10px;
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  align-self: flex-start;
}

.item-info--text {
  display: flex;
  flex-flow: column;
}

.item-info--definition {
  font-size: 1.2em;
}

.item-info--type {
  font-size: 1.1em;
  color: blue;
}

.related-words--delete {
  border: none;
  background-color: #db2828;
  border-radius: 3px;
  padding: 5px 3px;
}
.related-words--delete:hover {
  background-color: #aa1c1c;
}
.related-words--delete > svg {
  width: 20px;
  height: 20px;
  color: white;
}
</style>
