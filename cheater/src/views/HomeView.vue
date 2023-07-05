<script setup>
import AboutItem from '../components/AboutItem.vue'
import DocumentationIcon from '../components/icons/IconDocumentation.vue'
import ToolingIcon from '../components/icons/IconTooling.vue'
import { ref, watch, computed } from 'vue'

const determinedWords = ref('')
const probableWords = ref('abcdefghijklmnopqrstuvwxyz')
const probableWordsBool = new Array(26).fill(false);
const unavailableWords = ref('')
let answerWordsWithDeterminedLetters = ref('')
let answerWordsWithoutDeterminedLetters = ref('')
let displayAnswer = ref(false)

// if there are duplicate letters in the determinedWords, remove them
function removeInvalid(ref) {
  determinedWords.value = determinedWords.value.toLowerCase()
  unavailableWords.value = unavailableWords.value.toLowerCase()
  let unique = ''
  for (let i = 0; i < ref.value.length; i++) {
    if (ref.value[i] === '*' || (unique.indexOf(ref.value[i]) == -1 && ref.value[i].match(/^[a-zA-Z*]+$/))) {
      unique += ref.value[i]
    }
  }
  ref.value = unique
}

watch(determinedWords, () => {
  removeInvalid(determinedWords)
})
watch(unavailableWords, () => {
  removeInvalid(unavailableWords)
})

function processWord() {
  probableWordsBool.fill(false)
  probableWords.value = ''
  // probableWords.value => 26 letters of the alphabet excluding determinedWords and unavailableWords
  for (let i = 0; i < determinedWords.value.length; i++) {
    let index = determinedWords.value.charCodeAt(i) - 97
    if (index >= 0 && index <= 25) {
      probableWordsBool[index] = true
    }
  }
  for (let i = 0; i < unavailableWords.value.length; i++) {
    let index = unavailableWords.value.charCodeAt(i) - 97
    if (index >= 0 && index <= 25) {
      probableWordsBool[index] = true
    }
  }
  for (let i = 0; i < 26; i++) {
    if (!probableWordsBool[i]) {
      probableWords.value += String.fromCharCode(i + 97)
    }
  }
}

// import wordList from wordlist.js
import { wordList } from '../components/wordlist.js'

// match all available words in array 'wordList' with the letter in determinedWords (but not in the unavailableWords) and print out the number of words
function countWordsWithDeterminedLetters(wordList, determinedWords, unavailableWords) {
  if (determinedWords.length === 0) {
    answerWordsWithDeterminedLetters.value = 0;
    return 0;
  }
  let removedLetters = unavailableWords;
  let probableWords = wordList.filter(word => {
    for (let i = 0; i < removedLetters.length; i++) {
      let letter = removedLetters[i];
      if (letter !== "*" && word.includes(letter)) {
        return false;
      }
    }
    for (let i = 0; i < determinedWords.length; i++) {
      let letter = determinedWords[i];
      if (letter !== "*" && !word.includes(letter)) {
        return false;
      }
    }
    return true;
  });
  return probableWords;
}

function countWordsWithoutDeterminedLetters(wordList, determinedWords, unavailableWords) {
  let removedLetters = unavailableWords;
  let probableWords = wordList.filter(word => {
    for (let i = 0; i < removedLetters.length; i++) {
      let letter = removedLetters[i];
      if (letter !== "*" && word.includes(letter)) {
        return false;
      }
    }
    for (let i = 0; i < determinedWords.length; i++) {
      let letter = determinedWords[i];
      if (letter !== "*" && word.includes(letter)) {
        return false;
      }
    }
    return true;
  });
  return probableWords;
}

//execute processWord() everytime when the value of determinedWords and unavailableWords changes
watch([determinedWords, unavailableWords], () => {
  processWord();
  if (determinedWords.value || unavailableWords.value) {
    displayAnswer.value = true;
  }
  else {
    displayAnswer.value = false;
  }
  if (!determinedWords.value)
    answerWordsWithDeterminedLetters.value = 'NO GIVEN LETTERS'
  else
    answerWordsWithDeterminedLetters.value = countWordsWithDeterminedLetters(wordList, determinedWords.value, unavailableWords.value).join(', ');
  answerWordsWithoutDeterminedLetters.value = countWordsWithoutDeterminedLetters(wordList, determinedWords.value, unavailableWords.value).join(', ');
})
</script>

<template>
  <div class="home">
    <h1>
      Wordle Cheater
      <span class="badge wide-badge">Beta 0.1</span>
    </h1>
    <span class="badge narrow-badge">Beta 0.1</span>
    <p>
      This is a tool to help you cheat at the game <a href="https://www.nytimes.com/games/wordle/index.html">Wordle</a>.
    </p>
    <p>Enter your word below:</p>

    <main>
      <AboutItem>
        <template #icon>
          <DocumentationIcon />
        </template>
        <template #heading>Determined letters</template>
        <input v-model="determinedWords" type="text" class="input-word" pattern="^[a-zA-Z*]+$" maxlength="5"
          placeholder="letter here" />
      </AboutItem>
      <AboutItem>
        <template #icon>
          <DocumentationIcon />
        </template>
        <template #heading>Unavailable letters</template>
        <input v-model="unavailableWords" type="text" class="input-word" pattern="^[a-zA-Z*]+$" maxlength="21"
          placeholder="letter here" />
      </AboutItem>
      <AboutItem>
        <template #icon>
          <DocumentationIcon />
        </template>
        <template #heading>Porbable letters</template>
        <p style="text-transform: uppercase;">{{ probableWords }}</p>
      </AboutItem>
      <AboutItem>
        <template #icon>
          <ToolingIcon />
        </template>
        <template #heading>Answers</template>
        <div style="display: flex;" v-if="displayAnswer">
          <div class="answerBox">
            <h3>With determined letters</h3>
            <p style="text-transform: uppercase;max-height: 200px;overflow-y: scroll;">{{
              answerWordsWithDeterminedLetters
            }}</p>
          </div>
          <div class="answerBox">
            <h3>Without determined letters</h3>
            <p style="text-transform: uppercase;max-height: 200px;overflow-y: scroll;">{{
              answerWordsWithoutDeterminedLetters }}</p>
          </div>
        </div>
        <div v-else>
          <p style="text-transform: uppercase;">Please input the letters.</p>
        </div>
      </AboutItem>
    </main>
  </div>
</template>



<style scoped>
strong {
  font-weight: bold;
}

.home {
  text-align: center;
  padding: 0 1rem;
}

.wide-badge {
  display: none;
}

.narrow-badge {
  display: unset;
}

@media (min-width: 1024px) {
  .home {
    text-align: left;
    min-height: 100vh;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-content: center;
    justify-content: center;
  }

  .wide-badge {
    display: unset;
  }

  .narrow-badge {
    display: none;
  }
}

@media (max-width: 1024px) {
  .item {
    margin-top: 2rem;
    display: flex;
    position: relative;
    flex-direction: column;
    align-items: center;
  }
}

.badge {
  bottom: 5px;
  position: relative;
  background-color: #000;
  color: #fff;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  line-height: 1;
  font-weight: 700;
  text-transform: uppercase;
  margin-left: 0.5rem;
}

.input-word {
  border: 1px solid #f0f0f0;
  border-radius: 6px;
  padding: 4px;
  text-transform: uppercase;
}

:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px #f1f1f1;
}

.answerBox {
  width: 50%;
}
</style>