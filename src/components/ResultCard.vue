<script setup>
defineProps({
  score: {
    type: Number,
    required: true
  },
  totalQuestions: {
    type: Number,
    required: true
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
    
    <h2 class="result-title">Quiz Completed!</h2>
    <p class="result-message" v-if="score === totalQuestions">Perfect Score! Execellent work.</p>
    <p class="result-message" v-else-if="score > totalQuestions / 2">Great job!</p>
    <p class="result-message" v-else>Keep practicing!</p>

    <button class="restart-btn" @click="emit('restart')">
      Restart Quiz
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
  max-width: 500px;
  text-align: center;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
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

@keyframes popIn {
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
}
</style>
