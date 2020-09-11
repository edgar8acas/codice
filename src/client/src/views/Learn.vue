<template>
  <div class="learn">
    <div class="learn--header">
      <div class="learn--header-left">
        <h2 class="learn--title">{{ text.title }}</h2>
          <LearnButton @click.native="addSelectedOccurrence" class="has-image" v-if="selectedToAdd.length > 0">
            <template v-slot:image>
              <svg height="14pt" viewBox="0 0 448 448" width="14pt" xmlns="http://www.w3.org/2000/svg"><path d="m408 184h-136c-4.417969 0-8-3.582031-8-8v-136c0-22.089844-17.910156-40-40-40s-40 17.910156-40 40v136c0 4.417969-3.582031 8-8 8h-136c-22.089844 0-40 17.910156-40 40s17.910156 40 40 40h136c4.417969 0 8 3.582031 8 8v136c0 22.089844 17.910156 40 40 40s40-17.910156 40-40v-136c0-4.417969 3.582031-8 8-8h136c22.089844 0 40-17.910156 40-40s-17.910156-40-40-40zm0 0"/></svg>
            </template>
            Agregar palabra
          </LearnButton>
      </div>
    </div>
    <div class="learn--text">
      <text-content
        class="learn--text-content"
        :text="text"
        :isLearning="true"
      ></text-content>
    </div>
    <div class="learn--tab-component">
      <div class="learn--tab-component-nav">
        <button
          v-for="tab in tabs"
          :key="tab.component"
          :class="[
            'learn--tab-button',
            { 'learn--active-tab': currentTab.component === tab.component },
          ]"
          @click="currentTab = tab"
        >
          {{ tab.name }}
        </button>
      </div>
      <keep-alive>
        <component
          v-bind:is="this.currentTab.component"
          :occurrence="occurrence"
        >
        </component>
      </keep-alive>
    </div>

    
  </div>
</template>

<script>
import TextContent from "@/components/TextContent";
import WordMeanings from "@/components/WordMeanings";
import LearnDictionary from "@/components/LearnDictionary";
import WordDetails from "@/components/WordDetails";
import DropdownMenu from "@/components/DropdownMenu";
import LearnButton from "@/components/LearnButton";

import { mapState, mapActions } from "vuex";
import {
  GET_DATA_FOR_LEARNING,
  UPDATE_DICTIONARY,
  UPDATE_OCCURRENCE,
  GET_MEANINGS_FOR_WORD,
  ADD_USER_OCCURRENCE,
  GET_TEXT_BY_ID,
  DELETE_USER_OCCURRENCE,
  TOGGLE_ADDING_WORD,
} from "./../store/action-types";

export default {
  components: {
    TextContent,
    WordMeanings,
    LearnDictionary,
    WordDetails,
    DropdownMenu,
    LearnButton
  },
  data() {
    return {
      textId: this.$route.params.id,
      occurrence: {},
      isLearnt: false,
      optionsMenuActive: false,
      currentTab: {
        name: "Palabra actual",
        component: "word-meanings",
      },
      tabs: [
        { name: "Palabra actual", component: "word-meanings" },
        { name: "Diccionario", component: "learn-dictionary" },
      ],
    };
  },
  computed: {
    ...mapState("texts", ["texts"]),
    ...mapState(["template"]),
    ...mapState("learn", ["addingWord", "selectedToAdd"]),
    text() {
      return this.texts.find((text) => text.textId === Number(this.textId));
    },
    formatEssential() {
      return this.occurrence.essential ? "Esencial" : "No esencial";
    },
    formatAvailableMeanings() {
      return this.occurrence.availableMeanings
        ? "Definiciones disponibles"
        : "Sin definiciones";
    },
    formatVisible() {
      return this.occurrence.visible ? "Visible" : "No visible";
    },
  },
  async mounted() {
    await this[GET_TEXT_BY_ID](this.textId);
    await this[GET_DATA_FOR_LEARNING](this.textId);
  },
  methods: {
    ...mapActions("texts", [GET_TEXT_BY_ID]),
    ...mapActions("learn", [
      GET_DATA_FOR_LEARNING,
      ADD_USER_OCCURRENCE,
      TOGGLE_ADDING_WORD
    ]),
    ...mapActions([
      GET_MEANINGS_FOR_WORD,
      UPDATE_OCCURRENCE,
      DELETE_USER_OCCURRENCE,
    ]),
    toggleOptionsMenu() {
      this.optionsMenuActive = !this.optionsMenuActive;
    },
    async deleteOccurrence(id) {
      await this[DELETE_USER_OCCURRENCE](id);
      // TODO: Avoid reloading the page
      window.location.reload();
    },
    async toggleVisibility(occurrence) {
      occurrence.visible = !occurrence.visible;
      await this[UPDATE_OCCURRENCE](occurrence);
    },
    async toggleIsLearned(dictionaryWord) {
      dictionaryWord.isLearned = !dictionaryWord.isLearned;
      await this[UPDATE_DICTIONARY](dictionaryWord);
    },
    toggleAddOccurrence() {
      this.activeAddingOccurrence = true;
    },
    async addSelectedOccurrence() {
      await this[ADD_USER_OCCURRENCE]();
      // TODO: Avoid reloading the page
      window.location.reload();
    },
  },
};
</script>

<style lang="scss">
:root {
  --learn-background: #abd1c6;
  --learn-secondary: #004643;
}
.learn.main {
  grid-column: 2 / span 8;
  font-family: "Mulish", sans-serif;
}

.learn--header {
  padding-bottom: 20px;
  margin-bottom: 10px;
  border-bottom: 3px solid var(--learn-secondary);
}

.learn--header-left {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  width: 40%;
}

.learn--text {
  width: 40%;
  float: left;
  overflow: scroll;
  overflow-x: hidden;
  height: 100%;
}

.learn--text-content {
  font-size: 1.8em;
  text-align: left;
  line-height: 160%;
}

.learn--title {
  font-family: "Mulish", sans-serif;
  font-size: 2.5em;
  text-align: left;
  font-weight: 800;
}

.learn--tab-component {
  width: 60%;
  float: right;
  height: 80vh;
}

.learn--tab-component-nav {
  display: flex;
  margin-bottom: 10px;
}

.learn--tab-button {
  flex-grow: 1;
  border: none;
  background: none;
  font-size: 1.3em;
  padding: 6px 9px;
  border-bottom: 4px solid lightblue;
}

.learn--tab-button:hover {
  background-color: #f1f8fb;
}

.learn--active-tab.learn--tab-button:hover {
  background-color: lightblue;
}

.learn--active-tab {
  background-color: lightblue;
}

.learn__word-actions {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 1em;
  grid-column: 1 / 3;
  // border: 1px solid red;
  margin-left: 20px;
  margin-right: 20px;

  > * {
    margin-top: 10px;
  }
}

.central {
  display: grid;
  grid-template-columns: 25% 50% 25%;
  justify-content: center;
  column-gap: 0.5em;
}
.side-info {
  border-radius: 5px;
  text-align: center;

  .word-detailed-info {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0.5em;

    .feature {
      position: relative;

      span {
        color: #2185d0;
      }
      .help {
        display: none;
      }
      &:hover .help {
        display: block;
        border-radius: 20px;
        position: absolute;
        background-color: beige;
        z-index: 5;
        left: 200px;
        min-width: 200px;
        text-align: left;
        padding: 10px;
      }
    }
  }
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
</style>
