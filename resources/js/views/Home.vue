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
      nextUrl: null,
    };
  },
  methods: {
    scrollTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
          console.log('end of page');
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
            this.replies = this.listToTree(response.data.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    listToTree(data, options) {
      options = options || {};
      var ID_KEY = options.idKey || 'id';
      var PARENT_KEY = options.parentKey || 'reply_parent';
      var CHILDREN_KEY = options.childrenKey || 'Items';

      var item, id, parentId;
      var map = {};
      for (var i = 0; i < data.length; i++) {
        if (data[i][ID_KEY]) {
          map[data[i][ID_KEY]] = data[i];
          data[i][CHILDREN_KEY] = [];
        }
      }
      for (var i = 0; i < data.length; i++) {
        if (data[i][PARENT_KEY]) {
          if (map[data[i][PARENT_KEY]]) {
            map[data[i][PARENT_KEY]][CHILDREN_KEY].push(data[i]);
            data.splice(i, 1);
            i--;
          } else {
            data[i][PARENT_KEY] = 0;
          }
        }
      }
      return data;
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
