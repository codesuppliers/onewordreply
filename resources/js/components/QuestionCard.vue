<template>
  <div
    class="flex flex-col p-4 rounded-lg w-full sm:w-3/4 lg:w-1/2 md:transition-all lg:transition-all transition-all cursor-pointer h-fit"
    :class="bgColor"
  >
    <div class="flex" @click="emOnC">
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
      <ReplyField
        :bgColor="bgColorFlipped"
        :onClick="replyQuestion"
        :error="error"
        :value="question.id"
        :isWaiting="isWaiting"
        :disabled="error.length !== 0 || isWaiting"
        :onChange="replyFieldOnChange"
        :replyContent="reply"
      />
    </div>
    <div class="flex flex-col" v-if="opened">
      <ReplyTree
        v-for="reply in replies"
        :key="reply.id"
        :reply="reply"
        :bgColor="bgColor"
        class="p-4 rounded-lg mb-4"
        :class="bgColorFlipped"
        @addedSubReply="addedSubReply"
      />
    </div>
  </div>
</template>

<script>
import ReplyField from '@/components/ReplyField.vue';
import ReplyTree from '@/components/ReplyTree.vue';
import Button from '@/components/Button.vue';
import API from '@/api';

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
    ReplyField,
  },
  data() {
    return {
      reply: '',
      bgColorFlipped:
        this.bgColor === 'bg-one-primary'
          ? 'bg-one-primaryDark'
          : 'bg-one-primary',
      error: '',
      isWaiting: false,
    };
  },
  methods: {
    replyFieldOnChange(reply) {
      this.reply = reply;
    },

    emOnC() {
      this.onClick(this.value);

      this.reply = '';
      this.error = '';
    },
    addedSubReply(res) {
      this.$emit('addedSubReply', res);
    },
    replyQuestion(questionId) {
      if (this.error == '' && this.reply != '') {
        this.isWaiting = true;

        API.postReply(questionId, { content: this.reply, reply_id: null })
          .then((res) => {
            this.isWaiting = false;
            this.reply = '';
            this.error = '';

            this.$emit('addedReply', res.data.data);
          })
          .catch((err) => {
            this.error = 'Something went wrong';
          });

        this.error = '';
      } else {
        this.error = 'Enter only one word!';
      }
    },
  },
  watch: {
    reply() {
      if (this.reply && !RegExp(/^\b[a-zA-Z0-9_]+\b$/).test(this.reply)) {
        this.error = 'Enter only one word!';
      } else {
        this.error = '';
      }
    },
  },
};
</script>
