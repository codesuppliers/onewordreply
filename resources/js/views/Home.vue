<template>
  <div class="flex flex-col">
    <div class="flex w-full justify-center">
      <div class="flex flex-col w-full space-y-4 items-center mt-8 mb-12 mx-4">
        <QuestionCard
          v-for="(question, index) in questions"
          :key="question.id"
          :question="question"
          :bgColor="index % 2 == 0 ? 'bg-one-primary' : 'bg-one-primaryDark'"
          :onClick="loadReplies"
          :value="question.id"
          :replies="replies"
          :opened="question.id === openedId"
          @addedReply="addedReply"
          @addedSubReply="addedSubReply"
        />
      </div>
    </div>
    <div class="w-full flex justify-center mb-8" v-if="!isEndOfQuestions">
      <span class="flex justify-center btn-one-scrollfor"
        >Scroll for more!</span
      >
    </div>
    <div class="w-full flex justify-center mb-8" v-if="isEndOfQuestions">
      <Button type="end" :onClick="scrollTop">That's All Folks!</Button>
    </div>
  </div>
</template>

<script>
import API from '@/api';
import QuestionCard from '@/components/QuestionCard.vue';
import Button from '@/components/Button.vue';

export default {
  name: 'Home',
  components: {
    QuestionCard,
    Button,
  },
  data() {
    return {
      questions: [],
      scrollListener: null,
      isEndOfQuestions: false,
      openedId: null,
      replies: [],
      rawReplies: [],
      nextUrl: null,
    };
  },
  methods: {
    scrollTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    addedReply(reply) {
      this.rawReplies.push(reply);
      this.replies = this.listToTree(this.rawReplies);
    },
    addedSubReply(reply) {
      reply.Items = [];

      this.rawReplies.push(reply);
      this.replies = this.listToTree(this.rawReplies);
    },
    isEndOfPage() {
      const endOfPage =
        window.innerHeight + window.pageYOffset >= document.body.offsetHeight;

      if (endOfPage) {
        if (this.nextUrl) {
          API.getQuestions(this.nextUrl)
            .then((response) => {
              this.questions = this.questions.concat(response.data.data);
              this.nextUrl = response.data.links.next;
              this.isEndOfQuestions = false;
            })
            .catch((error) => {
              this.isEndOfQuestions = true;
            });
        } else {
          this.isEndOfQuestions = true;
        }
      }
    },
    loadReplies(questionId) {
      API.getReplies(questionId)
        .then((response) => {
          if (this.openedId === questionId) {
            this.openedId = null;
            this.replies = [];
          } else {
            this.openedId = questionId;
            this.rawReplies = response.data.data;
            this.replies = this.listToTree(response.data.data);
          }
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
          console.log(arr);
          arr[map[node.reply_parent]].Items.push(node);
        } else {
          roots.push(node);
        }
      }
      return roots;
    },
  },
  created() {
    API.getQuestions('/api/questions')
      .then((response) => {
        this.questions = this.questions.concat(response.data.data);
        this.nextUrl = response.data.links.next;

        this.scrollListener = window.addEventListener(
          'scroll',
          this.isEndOfPage
        );
        this.isEndOfPage();
      })
      .catch((error) => {
        this.isEndOfQuestions = true;
      });
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.isEndOfPage);
  },
};
</script>
