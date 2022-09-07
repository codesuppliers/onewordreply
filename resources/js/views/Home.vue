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
      <span class="flex justify-center btn-one-end">Scroll for more!</span>
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
      scrollCount: 0,
      scrollListener: null,
      isEndOfQuestions: true,
      openedId: null,
      replies: [],
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
        this.scrollCount++;
        API.getQuestions(this.scrollCount)
          .then((response) => {
            this.questions = this.questions.concat(response.data);
            this.isEndOfQuestions = false;
          })
          .catch((error) => {
            this.scrollCount--;
            this.isEndOfQuestions = true;
          });
      }
    },
    loadReplies(questionId) {
      API.getReplies(questionId)
        .then((response) => {
          console.log(response.data);
          this.openedId = questionId;
          this.replies = this.listToTree(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    listToTree(data, options) {
      options = options || {};
      var ID_KEY = options.idKey || 'id';
      var PARENT_KEY = options.parentKey || 'replyParent';
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
    this.scrollCount++;
    API.getQuestions(this.scrollCount)
      .then((response) => {
        this.questions = this.questions.concat(response.data);
      })
      .catch((error) => {
        this.isEndOfQuestions = true;
      });

    this.scrollListener = window.addEventListener('scroll', this.isEndOfPage);

    this.isEndOfPage();
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.isEndOfPage);
  },
};
</script>
