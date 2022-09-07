<template>
  <div
    class="flex flex-col bg-one-primary p-4 rounded-lg w-full sm:w-3/4 lg:w-1/2 md:transition-all lg:transition-all transition-all cursor-pointer"
  >
    <span>{{ question.question }}</span>
  </div>
</template>

<script>
export default {
  name: 'QuestionCard',
  props: {
    question: {
      type: Object,
      required: true,
    },
  },
};
</script>
