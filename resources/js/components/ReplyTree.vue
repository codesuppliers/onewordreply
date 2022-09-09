<template>
  <div
    class="flex flex-col pl-4"
    :class="reply.reply_parent !== null ? 'border-l-2 border-one-gray ' : ''"
  >
    <div
      class="flex text-one-gray space-x-2"
      :class="reply.reply_parent !== null ? 'pt-4' : ''"
    >
      <span class="font-bold text-sm text-one-secondary">{{
        reply.username
      }}</span>
      <span class="text-xs">•</span>
      <span class="text-sm">{{ reply.created_at }}</span>
      <!-- <span class="text-xs">•</span> -->
    </div>

    <div class="pl-2 w-full border-l-2 border-one-gray mt-2 text-sm">
      <span>{{ reply.content }}</span>
      <Button
        type="reply"
        lIcon="IconReply"
        :onClick="openReplyF"
        :value="reply.id"
        class="mt-1"
        >Reply</Button
      >
    </div>

    <div class="flex space-x-2 mt-4 mb-4" v-if="openReply">
      <ReplyField
        :bgColor="bgColor"
        :onClick="replySend"
        :error="error"
        :value="reply.id"
        :isWaiting="isWaiting"
        :disabled="error.length !== 0 || isWaiting"
        :onChange="replyFieldOnChange"
        :replyContent="replyContent"
      />
    </div>
    <div v-if="hasChildren">
      <ReplyTree
        v-for="rep in reply.Items"
        :key="rep.id"
        :reply="rep"
        :bgColor="bgColor"
        class=""
        @addedSubReply="addedSubReply"
      />
    </div>
  </div>
</template>

<script>
import ReplyField from '@/components/ReplyField.vue';
import Button from '@/components/Button.vue';
import API from '@/api';

export default {
  name: 'ReplyTree',
  props: {
    reply: {
      type: Object,
      required: true,
    },
    bgColor: {
      type: String,
      required: true,
    },
  },
  components: {
    Button,
    ReplyField,
  },
  computed: {
    hasChildren() {
      let children = this.reply.Items;
      return children && children.length > 0;
    },
  },
  data() {
    return {
      replyContent: '',
      openReply: false,
      error: '',
      isWaiting: false,
    };
  },
  methods: {
    replyFieldOnChange(reply) {
      this.replyContent = reply;
    },
    openReplyF() {
      this.openReply = !this.openReply;
      this.replyContent = '';
      this.error = '';
    },
    addedSubReply(res) {
      this.$emit('addedSubReply', res);
    },
    replySend(id) {
      if (this.error == '' && this.reply != '') {
        this.isWaiting = true;

        API.postReply(this.reply.question_id, {
          content: this.replyContent,
          reply_id: id,
        })
          .then((res) => {
            this.isWaiting = false;
            this.replyContent = '';
            this.error = '';
            this.openReply = !this.openReply;

            this.$emit('addedSubReply', res.data.data);
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
    replyContent() {
      if (
        this.replyContent &&
        !RegExp(/^\b[a-zA-Z0-9_]+\b$/).test(this.replyContent)
      ) {
        this.error = 'Enter only one word!';
      } else {
        this.error = '';
      }
    },
  },
};
</script>
