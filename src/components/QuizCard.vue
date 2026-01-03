<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  question: {
    type: Object,
    required: true
  },
  currentQuestionIndex: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['answer']);

const selectedOption = ref(null);
const isAnswered = ref(false);

const selectOption = (key) => {
  if (isAnswered.value) return; // Prevent changing answer
  selectedOption.value = key;
  isAnswered.value = true;
};

const nextQuestion = () => {
  emit('answer', selectedOption.value);
};

const isCorrect = computed(() => {
  return selectedOption.value === props.question.correctAnswer;
});

const progress = computed(() => {
    return ((props.currentQuestionIndex + 1) / props.totalQuestions) * 100;
});

const getOptionClass = (key) => {
  if (!isAnswered.value) {
    return selectedOption.value === key ? 'selected' : '';
  }
  
  if (key === props.question.correctAnswer) {
    return 'correct';
  }
  
  if (key === selectedOption.value && key !== props.question.correctAnswer) {
    return 'wrong';
  }
  
  return 'dimmed';
};
</script>

<template>
  <div class="quiz-card">
    <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progress + '%' }"></div>
    </div>
    
    <div class="question-header">
      <span class="question-number">Question {{ currentQuestionIndex + 1 }} / {{ totalQuestions }}</span>
      <h2 class="question-text">{{ question.text }}</h2>
    </div>

    <div class="options-grid">
      <button 
        v-for="(text, key) in question.options" 
        :key="key" 
        class="option-btn"
        :class="getOptionClass(key)"
        @click="selectOption(key)"
        :disabled="isAnswered"
      >
        <span class="option-key">{{ key.toUpperCase() }}</span>
        <span class="option-text">{{ text }}</span>
        
        <!-- Icons for status -->
        <span v-if="isAnswered && key === question.correctAnswer" class="status-icon">✓</span>
        <span v-if="isAnswered && key === selectedOption && key !== question.correctAnswer" class="status-icon">✗</span>
      </button>
    </div>

    <!-- Feedback Section -->
    <div v-if="isAnswered" class="feedback-section" :class="isCorrect ? 'is-correct' : 'is-wrong'">
      <div class="feedback-content">
        <h3>{{ isCorrect ? 'Bonne Réponse !' : 'Mauvaise Réponse' }}</h3>
        <p v-if="!isCorrect">
          La bonne réponse est : <span class="correct-text">{{ question.options[question.correctAnswer] }}</span>
        </p>
        <p v-else>
          Bien joué ! C'est la bonne réponse.
        </p>
      </div>
      <button class="next-btn" @click="nextQuestion">
        {{ currentQuestionIndex === totalQuestions - 1 ? 'Voir les Résultats' : 'Question Suivante' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.quiz-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2rem;
  width: 100%;
  max-width: 800px;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  animation: fadeIn 0.5s ease-out;
  display: flex;
  flex-direction: column;
}

.progress-bar {
    height: 6px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
    margin-bottom: 2rem;
    overflow: hidden;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #00c6ff, #0072ff);
    transition: width 0.3s ease;
}

.question-header {
  margin-bottom: 2rem;
}

.question-number {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 1px;
}

.question-text {
  font-size: 1.5rem;
  color: #fff;
  margin-top: 0.5rem;
  font-weight: 600;
  line-height: 1.4;
}

.options-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
}

.option-btn {
  display: flex;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #fff;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  position: relative;
}

.option-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.3);
}

.option-btn.selected {
  background: rgba(0, 198, 255, 0.2);
  border-color: #00c6ff;
}

.option-btn.correct {
  background: rgba(46, 204, 113, 0.2);
  border-color: #2ecc71;
}

.option-btn.wrong {
  background: rgba(231, 76, 60, 0.2);
  border-color: #e74c3c;
}

.option-btn.dimmed {
  opacity: 0.5;
}

.option-key {
  background: rgba(255, 255, 255, 0.1);
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  font-weight: bold;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.option-text {
  font-size: 1.1rem;
}

.status-icon {
  margin-left: auto;
  font-weight: bold;
  font-size: 1.2rem;
}

.feedback-section {
  background: rgba(0, 0, 0, 0.2);
  padding: 1.5rem;
  border-radius: 15px;
  border-left: 5px solid;
  animation: slideUp 0.3s ease-out;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.feedback-section.is-correct {
  border-color: #2ecc71;
  background: rgba(46, 204, 113, 0.1);
}

.feedback-section.is-wrong {
  border-color: #e74c3c;
  background: rgba(231, 76, 60, 0.1);
}

.feedback-content h3 {
  margin: 0 0 0.5rem 0;
  color: #fff;
}

.feedback-content p {
  margin: 0;
  color: rgba(255, 255, 255, 0.9);
}

.correct-text {
  font-weight: bold;
  color: #fff;
}

.next-btn {
  background: #fff;
  color: #333;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.2s;
  white-space: nowrap;
}

.next-btn:hover {
  transform: scale(1.05);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (min-width: 768px) {
  .options-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
