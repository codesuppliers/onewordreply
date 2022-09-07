const questions = {
  data: [
    {
      id: 1,
      question: 'What is the capital of India?',
    },
    {
      id: 2,
      question: 'What is the capital of Pakistan?',
    },
    {
      id: 3,
      question: 'What is the capital of Bangladesh?',
    },
  ],
};

const API = {
  getQuestions: function () {
    return Promise.resolve(questions);
  },
};

export default API;
