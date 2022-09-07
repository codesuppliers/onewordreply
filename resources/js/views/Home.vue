<template>
  <div class="flex w-full justify-center">
    <div class="flex flex-col w-full space-y-4 items-center mt-8 mx-4">
      <QuestionCard
        v-for="question in questions"
        :key="question.id"
        :question="question"
      />
    </div>
  </div>
</template>

<script>
import API from '@/api';
import QuestionCard from '@/components/QuestionCard.vue';

export default {
  name: 'Home',
  components: {
    QuestionCard,
  },
  data() {
    return {
      questions: [],
    };
  },
  created() {
    API.getQuestions().then((response) => {
      this.questions = response.data;
    });
  },
};
</script>
