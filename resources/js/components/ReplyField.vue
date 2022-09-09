<template>
  <div class="grow">
    <input
      class="w-full h-full rounded-lg px-4 items-center"
      :class="bgColor + (error ? ' border-2 border-red-500' : '')"
      type="text"
      placeholder="Write your reply in one word..."
      v-on:keyup="onChange(reply)"
      v-model="reply"
      maxlength="30"
      @click.stop
    />
  </div>
  <Button
    type="replyBtn"
    :onClick="onClick"
    lIcon="IconReplyBtn"
    class="hidden md:flex"
    :value="value"
    :isWaiting="isWaiting"
    :disabled="disabled"
  >
    Reply
  </Button>
</template>

<script>
import Button from '@/components/Button.vue';

export default {
  name: 'ReplyField',
  props: {
    bgColor: {
      type: String,
      default: 'bg-one-primary',
    },
    onClick: {
      type: Function,
      default: () => {},
    },
    error: {
      type: String,
      default: '',
    },
    value: {
      type: Number,
      default: -1,
    },
    isWaiting: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    onChange: {
      type: Function,
      default: () => {},
    },
    replyContent: {
      type: String,
      default: '',
    },
  },
  components: {
    Button,
  },
  data() {
    return {
      reply: '',
    };
  },
  computed: {},
  methods: {
    replyQuestion() {
      if (this.reply.length === 0) {
        this.error = 'Reply cannot be empty';
        return;
      }
      this.$emit('replyQuestion', this.reply);
      this.reply = '';
    },
  },
  watch: {
    replyContent() {
      this.reply = this.replyContent;
    },
  },
};
</script>
