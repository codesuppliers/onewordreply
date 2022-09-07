<template>
  <div class="w-full h-fit md:h-24 flex flex-col">
    <div
      class="flex md:hidden w-full items-center justify-center space-x-4 pt-4"
    >
      <div class="w-40">
        <div class="bg-pink-300 px-4 py-2 rounded-lg">social</div>
      </div>
      <div class="w-40">
        <Button type="ask" :onClick="askQuestion" lIcon="IconPlus">
          Ask question
        </Button>
      </div>
    </div>
    <div class="w-full h-16 flex justify-between pt-4 items-center">
      <div class="ml-4 w-40">
        <div class="hidden md:flex bg-pink-300 px-4 py-2 rounded-lg">
          social
        </div>
      </div>
      <h1 class="text-4xl font-bold">OneWordReply</h1>
      <div class="mr-4 w-40">
        <Button
          type="ask"
          :onClick="askQuestion"
          lIcon="IconPlus"
          class="hidden md:flex"
        >
          Ask question
        </Button>
      </div>
    </div>
    <div class="w-full flex justify-center mt-2 px-4">
      <span class="text-center">
        Are you tired of reading long replies to your questions? - Yes.
      </span>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';

export default {
  name: 'Header',
  components: {
    Button,
  },
  data() {
    return {
      //
    };
  },
  methods: {
    askQuestion() {
      this.$router.push('/ask');
    },
  },
};
</script>
