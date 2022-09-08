<template>
  <div
    class="flex flex-col p-4 rounded-lg w-full sm:w-3/4 lg:w-1/2 md:transition-all lg:transition-all transition-all cursor-pointer h-fit"
    :class="bgColor"
    @click="emOnC"
  >
    <div class="flex">
      <div class="flex flex-col grow">
        <span class="font-bold grow">{{ question.content }}</span>
        <span class="text-sm" :class="opened ? 'mb-4' : ''">{{
          question.description
        }}</span>
      </div>

      <div class="flex flex-col items-end">
        <span class="text-xs font-bold text-one-secondary">{{
          question.username
        }}</span>
        <span class="text-xs font-bold">#{{ question.id }}</span>
      </div>
    </div>
    <div
      class="flex space-x-2"
      :class="replies.length > 0 ? 'mb-4' : ''"
      v-if="opened"
    >
      <div class="grow">
        <input
          class="w-full h-full rounded-lg px-4 items-center"
          :class="bgColorFlipped + (error ? ' border-2 border-red-500' : '')"
          type="text"
          placeholder="Write your reply in one word..."
          v-model="reply"
          maxlength="30"
          @click.stop
        />
      </div>
      <Button
        type="replyBtn"
        :onClick="replyQuestion"
        lIcon="IconReplyBtn"
        class="hidden md:flex"
        :value="question.id"
      >
        Reply
      </Button>
    </div>
    <div class="flex flex-col" v-if="opened">
      <ReplyTree
        v-for="reply in replies"
        :key="reply.id"
        :reply="reply"
        :bgColor="bgColor"
        class="p-4 rounded-lg mb-4"
        :class="bgColorFlipped"
      />
    </div>
  </div>
</template>

<script>
import ReplyTree from '@/components/ReplyTree.vue';
import Button from '@/components/Button.vue';

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
    Button,
  },
  data() {
    return {
      reply: '',
      bgColorFlipped:
        this.bgColor === 'bg-one-primary'
          ? 'bg-one-primaryDark'
          : 'bg-one-primary',
      error: '',
    };
  },
  methods: {
    emOnC() {
      this.onClick(this.value);

      this.reply = '';
      this.error = '';
    },
    replyQuestion(questionId) {
      if (this.error == '' && this.reply != '') {
        console.log({
          question_id: questionId,
          reply_id: null,
          content: this.reply,
        });
        this.error = '';
      } else {
        this.error = 'Enter only one word!';
        console.log('Error');
      }
    },
  },
  watch: {
    reply() {
      if (!RegExp(/^\b[a-zA-Z0-9_]+\b$/).test(this.reply)) {
        this.error = 'Enter only one word!';
      } else {
        this.error = '';
      }
    },
  },
};
</script>
