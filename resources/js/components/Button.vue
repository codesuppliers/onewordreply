<template>
  <div :class="w ? w : ''">
    <button
      :class="
        'flex justify-center whitespace-nowrap btn-one-' +
        type +
        (w ? ' ' + w : '')
      "
      @click="onClick(value)"
    >
      <div class="flex flex-col justify-center h-full">
        <div class="flex items-center">
          <SvgIcon :name="icon" v-if="icon" />
          <SvgIcon :name="lIcon" v-if="lIcon" class="mr-2" />
          <slot></slot>
          <SvgIcon :name="rIcon" v-if="rIcon" class="ml-2" />
        </div>
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
