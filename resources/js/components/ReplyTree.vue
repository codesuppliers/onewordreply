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
        :onClick="writeReply"
        :value="reply.id"
        class="mt-1"
        >Reply</Button
      >
    </div>

    <div v-if="hasChildren">
      <ReplyTree
        v-for="rep in reply.Items"
        :key="rep.id"
        :reply="rep"
        class="pl-4"
      />
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';

export default {
  name: 'ReplyTree',
  props: {
    reply: {
      type: Object,
      required: true,
    },
    bgColor: {
      type: String,
      default: 'bg-one-primary',
    },
  },
  components: {
    Button,
  },
  computed: {
    hasChildren() {
      let children = this.reply.Items;
      return children && children.length > 0;
    },
  },
  data() {
    return {};
  },
  methods: {
    writeReply(id) {},
  },
};
</script>
