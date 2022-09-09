<template>
  <div :class="w ? w : ''">
    <button
      :class="
        'flex justify-center whitespace-nowrap disabled:opacity-40 btn-one-' +
        type +
        (w ? ' ' + w : '')
      "
      @click.stop="onClick(value)"
      :disabled="disabled"
    >
      <div class="flex flex-col justify-center h-full" v-if="!isWaiting">
        <div class="flex items-center">
          <SvgIcon :name="icon" v-if="icon" />
          <SvgIcon
            :name="lIcon"
            v-if="lIcon"
            :class="type !== 'reply' ? 'mr-2' : 'mr-1'"
          />
          <slot></slot>
          <SvgIcon
            :name="rIcon"
            v-if="rIcon"
            :class="type !== 'reply' ? 'ml-2' : 'ml-1'"
          />
        </div>
      </div>
      <div role="status" v-if="isWaiting">
        <SvgIcon name="IconLoading" />
        <span class="sr-only">Loading...</span>
      </div>
    </button>
  </div>
</template>

<script>
import SvgIcon from '@/components/essentials/SvgIcon.vue';

export default {
  name: 'Button',
  props: {
    type: {
      type: String,
      default: 'solid',
      required: true,
    },
    onClick: {
      type: Function,
      required: true,
    },
    value: {
      type: Number,
    },
    lIcon: {
      type: String,
    },
    rIcon: {
      type: String,
    },
    icon: {
      type: String,
    },
    w: {
      type: String,
    },
    isWaiting: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    SvgIcon,
  },
  data() {
    return {};
  },
  mounted() {},
  watch: {},
};
</script>
