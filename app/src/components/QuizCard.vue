<script setup>
import { computed } from 'vue';

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

const selectOption = (key) => {
  emit('answer', key);
};

const progress = computed(() => {
    return ((props.currentQuestionIndex + 1) / props.totalQuestions) * 100;
});
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
        @click="selectOption(key)"
      >
        <span class="option-key">{{ key.toUpperCase() }}</span>
        <span class="option-text">{{ text }}</span>
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
}

.option-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.3);
}

.option-btn:active {
  transform: translateY(0);
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
}

.option-text {
  font-size: 1.1rem;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (min-width: 768px) {
  .options-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
