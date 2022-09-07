<template>
  <div
    class="flex flex-col p-4 rounded-lg w-full sm:w-3/4 lg:w-1/2 md:transition-all lg:transition-all transition-all cursor-pointer h-fit"
    :class="bgColor"
    @click="onClick(value)"
  >
    <div class="flex">
      <span class="font-bold grow">{{ question.question }}</span>
      <span class="text-sm font-bold">#{{ question.id }}</span>
    </div>
    <span class="text-sm" :class="opened ? 'mb-4' : ''">{{
      question.description
    }}</span>
    <div class="flex flex-col" v-if="opened">
      <ReplyTree
        v-for="reply in replies"
        :key="reply.id"
        :reply="reply"
        :bgColor="bgColor"
        class="p-4 rounded-lg mb-4"
      />
    </div>
  </div>
</template>

<script>
import ReplyTree from '@/components/ReplyTree.vue';

export default {
  name: 'QuestionCard',
  props: {
    question: {
      type: Object,
      required: true,
    },
    bgColor: {
      type: String,
      default: 'bg-one-primary',
    },
    onClick: {
      type: Function,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    replies: {
      type: Array,
      default: [],
    },
    opened: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    ReplyTree,
  },
};
</script>
