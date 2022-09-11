<template>
  <div class="flex flex-col w-full items-center">
    <div
      class="flex flex-col p-4 rounded-lg w-full sm:w-3/4 lg:w-1/2 md:transition-all lg:transition-all transition-all space-y-2"
    >
      <label for="question">Question</label>
      <input
        type="text"
        name="question"
        ref="question"
        v-model="form.content"
        class="rounded-lg bg-one-primary h-12 px-4 py-3"
      />
    </div>
    <div
      class="flex flex-col p-4 rounded-lg w-full sm:w-3/4 lg:w-1/2 md:transition-all lg:transition-all transition-all space-y-2"
    >
      <label for="description">Description</label>
      <textarea
        name="description"
        ref="description"
        cols="30"
        rows="10"
        v-model="form.description"
        class="rounded-lg bg-one-primary p-4"
      ></textarea>
    </div>
    <div
      class="w-full sm:w-3/4 lg:w-1/2 md:transition-all lg:transition-all transition-all"
    >
      <Button
        type="submitQ"
        :onClick="submitQ"
        :w="'px-4 py-3 w-full sm:w-full md:transition-all lg:transition-all transition-all'"
      >
        Submit Question
      </Button>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button.vue';
import API from '@/api';

export default {
  name: 'Ask',
  components: {
    Button,
  },
  data() {
    return {
      form: {
        content: '',
        description: '',
      },
    };
  },
  methods: {
    submitQ() {
      API.postQuestion(this.form)
        .then((res) => {
          this.$router.push('/');
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
