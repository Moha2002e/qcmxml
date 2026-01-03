<script setup>
defineProps({
  score: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
  },
  wrongAnswers: {
    type: Array,
    default: () => []
  }
});

const emit = defineEmits(['restart']);
</script>

<template>
  <div class="result-card">
    <div class="score-circle">
      <span class="score-value">{{ score }}</span>
      <span class="score-total">/ {{ totalQuestions }}</span>
    </div>
    
    <h2 class="result-title">Quiz Terminé !</h2>
    <p class="result-message" v-if="score === totalQuestions">Score Parfait ! Excellent travail.</p>
    <p class="result-message" v-else-if="score > totalQuestions / 2">Bien joué !</p>
    <p class="result-message" v-else>Continuez à vous entraîner !</p>

    <!-- Wrong Answers Section -->
    <div v-if="wrongAnswers.length > 0" class="corrections-section">
      <h3>Corrections ({{ wrongAnswers.length }} erreurs)</h3>
      <div class="corrections-list">
        <div v-for="(item, index) in wrongAnswers" :key="index" class="correction-item">
          <p class="correction-question">{{ index + 1 }}. {{ item.question.text }}</p>
          
          <div class="correction-details">
            <div class="answer-row wrong">
              <span class="label">Votre réponse :</span>
              <span class="value">{{ item.userAnswer ? item.question.options[item.userAnswer] : 'Aucune' }}</span>
              <span class="icon">✗</span>
            </div>
            <div class="answer-row correct">
              <span class="label">Bonne réponse :</span>
              <span class="value">{{ item.question.options[item.correctAnswer] }}</span>
              <span class="icon">✓</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <button class="restart-btn" @click="emit('restart')">
      Recommencer le Quiz
    </button>
  </div>
</template>

<style scoped>
.result-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 3rem 2rem;
  width: 100%;
  max-width: 800px;
  text-align: center;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  max-height: 90vh;
  overflow-y: auto;
}

.score-circle {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00c6ff, #0072ff);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  box-shadow: 0 10px 20px rgba(0, 114, 255, 0.3);
  flex-shrink: 0;
}

.score-value {
  font-size: 3.5rem;
  font-weight: 800;
  color: #fff;
  line-height: 1;
}

.score-total {
  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.8);
}

.result-title {
  font-size: 2rem;
  color: #fff;
  margin-bottom: 0.5rem;
}

.result-message {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 2rem;
}

.corrections-section {
  text-align: left;
  margin-bottom: 2rem;
  background: rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  border-radius: 15px;
}

.corrections-section h3 {
  color: #fff;
  margin-top: 0;
  margin-bottom: 1.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.corrections-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.correction-item {
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 10px;
}

.correction-question {
  color: #fff;
  font-weight: 600;
  margin: 0 0 1rem 0;
}

.correction-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.answer-row {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border-radius: 6px;
  font-size: 0.95rem;
}

.answer-row.wrong {
  background: rgba(231, 76, 60, 0.15);
  color: #ff8a80;
  border: 1px solid rgba(231, 76, 60, 0.3);
}

.answer-row.correct {
  background: rgba(46, 204, 113, 0.15);
  color: #a5d6a7;
  border: 1px solid rgba(46, 204, 113, 0.3);
}

.answer-row .label {
  font-weight: bold;
  margin-right: 0.5rem;
  min-width: 100px;
}

.answer-row .value {
  flex: 1;
}

.answer-row .icon {
  margin-left: 0.5rem;
  font-weight: bold;
}

.restart-btn {
  background: #fff;
  color: #0072ff;
  border: none;
  padding: 1rem 2rem;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.restart-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  background: #f0f0f0;
}
</style>
