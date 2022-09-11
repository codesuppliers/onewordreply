<template>
  <div
    class="flex flex-col p-4 rounded-lg w-full sm:w-3/4 lg:w-2/3 md:transition-all lg:transition-all transition-all cursor-pointer h-fit max-w-6xl"
    :class="bgColor"
  >
    <div class="flex" @click="emOnC">
      <div class="flex flex-col grow justify-center">
        <span
          class="font-bold"
          :class="!question.description && opened ? 'pb-4' : ''"
          >{{ question.content }}</span
        >
        <span
          class="text-sm"
          :class="opened ? 'mb-4' : ''"
          v-if="question.description"
          >{{ question.description }}</span
        >
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
    <div class="flex flex-col w-full" v-if="opened">
      <div
        role="status"
        v-if="isWaitingReplies"
        class="flex w-full justify-center my-4"
      >
        <SvgIcon name="IconLoading" />
        <span class="sr-only">Loading...</span>
      </div>

      <div
        class="flex w-full justify-center mt-4"
        v-if="rawReplies.length == 0 && !isWaitingReplies"
      >
        <span>No replies yet!</span>
      </div>

      <div v-if="!isWaitingReplies">
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
  </div>
</template>

<script>
import ReplyField from '@/components/ReplyField.vue';
import ReplyTree from '@/components/ReplyTree.vue';
import Button from '@/components/Button.vue';
import API from '@/api';
import SvgIcon from '@/components/essentials/SvgIcon.vue';

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
    value: {
      type: Number,
      required: true,
    },
  },
  components: {
    ReplyTree,
    Button,
    ReplyField,
    SvgIcon,
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
      isWaitingReplies: false,
      replies: [],
      rawReplies: [],
      opened: false,
    };
  },
  methods: {
    addedReply(reply) {
      this.rawReplies.push(reply);
      this.replies = this.listToTree(this.rawReplies);
    },
    addedSubReply(reply) {
      reply.Items = [];

      this.rawReplies.push(reply);
      this.replies = this.listToTree(this.rawReplies);
    },
    loadReplies(questionId) {
      this.isWaitingReplies = true;

      API.getReplies(questionId)
        .then((response) => {
          this.rawReplies = response.data.data;
          this.replies = this.listToTree(response.data.data);
          this.isWaitingReplies = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    listToTree(arr) {
      var map = {},
        node,
        roots = [],
        i;
      for (i = 0; i < arr.length; i += 1) {
        map[arr[i].id] = i;
        arr[i].Items = [];
      }
      for (i = 0; i < arr.length; i += 1) {
        node = arr[i];
        if (node.reply_parent !== null) {
          //console.log(arr);
          arr[map[node.reply_parent]].Items.push(node);
        } else {
          roots.push(node);
        }
      }
      return roots;
    },

    replyFieldOnChange(reply) {
      this.reply = reply;
    },

    emOnC() {
      this.opened = !this.opened;

      this.reply = '';
      this.error = '';
    },
    replyQuestion(questionId) {
      if (this.error == '' && this.reply != '') {
        this.isWaiting = true;

        API.postReply(questionId, { content: this.reply, reply_id: null })
          .then((res) => {
            this.isWaiting = false;
            this.reply = '';
            this.error = '';

            this.addedReply(res.data.data);
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
    opened() {
      if (this.opened) {
        this.loadReplies(this.question.id);
      }
    },
  },
};
</script>
