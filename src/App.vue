<script setup>
import { ref, computed } from 'vue';
import questionsData from './assets/questions.json';
import QuizCard from './components/QuizCard.vue';
import ResultCard from './components/ResultCard.vue';

const questions = ref(questionsData);
const currentQuestionIndex = ref(0);
const score = ref(0);
const gameState = ref('intro'); // 'intro', 'quiz', 'result'

// Computed
const currentQuestion = computed(() => questions.value[currentQuestionIndex.value]);
const totalQuestions = computed(() => questions.value.length);

// Methods
const startQuiz = () => {
  gameState.value = 'quiz';
  currentQuestionIndex.value = 0;
  score.value = 0;
};

const handleAnswer = (key) => {
  if (key === currentQuestion.value.correctAnswer) {
    score.value++;
  }
  
  if (currentQuestionIndex.value < totalQuestions.value - 1) {
    currentQuestionIndex.value++;
  } else {
    gameState.value = 'result';
  }
};

const restartQuiz = () => {
  startQuiz();
};
</script>

<template>
  <div class="app-container">
    <div class="background-blobs"></div>
    
    <main class="content">
      <transition name="fade" mode="out-in">
        <!-- Intro Screen -->
        <div v-if="gameState === 'intro'" class="intro-card" key="intro">
          <h1>XML QCM Challenge</h1>
          <p>Test your knowledge of XML, DTD, XSD, XPath and more.</p>
          <div class="info-badges">
            <span class="badge">{{ totalQuestions }} Questions</span>
            <span class="badge">Multiple Choice</span>
          </div>
          <button @click="startQuiz" class="start-btn">Start Quiz</button>
        </div>

        <!-- Quiz Screen -->
        <QuizCard
          v-else-if="gameState === 'quiz'"
          :key="currentQuestionIndex"
          :question="currentQuestion"
          :current-question-index="currentQuestionIndex"
          :total-questions="totalQuestions"
          @answer="handleAnswer"
        />

        <!-- Result Screen -->
        <ResultCard
          v-else-if="gameState === 'result'"
          key="result"
          :score="score"
          :total-questions="totalQuestions"
          @restart="restartQuiz"
        />
      </transition>
    </main>
    
    <footer>
      <p>Created by Agentic Assistant • QCM XML</p>
    </footer>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
}

.content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  position: relative;
  z-index: 10;
}

/* Background Blobs */
.background-blobs {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  background: #0f0c29;
  background: linear-gradient(to right, #24243e, #302b63, #0f0c29);
  z-index: 0;
}

.background-blobs::before,
.background-blobs::after {
  content: '';
  position: absolute;
  width: 50vw;
  height: 50vw;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
  animation: moveBlob 20s infinite alternate;
}

.background-blobs::before {
  top: -10%;
  left: -10%;
  background: #00c6ff;
}

.background-blobs::after {
  bottom: -10%;
  right: -10%;
  background: #0072ff;
  animation-delay: -10s;
}

@keyframes moveBlob {
  0% { transform: translate(0, 0) scale(1); }
  100% { transform: translate(10%, 10%) scale(1.1); }
}

/* Intro Card */
.intro-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 3rem;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
  max-width: 600px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}

.intro-card h1 {
  font-size: 3rem;
  color: #fff;
  margin-bottom: 1rem;
  font-weight: 800;
  background: linear-gradient(to right, #fff, #b4d1ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.intro-card p {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 2rem;
}

.info-badges {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.badge {
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.start-btn {
  background: linear-gradient(135deg, #00c6ff, #0072ff);
  color: #fff;
  border: none;
  padding: 1rem 3rem;
  font-size: 1.2rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 114, 255, 0.3);
}

.start-btn:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 8px 25px rgba(0, 114, 255, 0.4);
}

footer {
  text-align: center;
  padding: 1rem;
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.8rem;
  position: relative;
  z-index: 10;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
