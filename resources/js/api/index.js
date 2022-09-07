const questions1 = {
  data: [
    {
      id: 30,
      question: 'What is the capital of India?',
      description: 'I would like to know the capital of India',
    },
    {
      id: 29,
      question: 'What is the capital of Pakistan?',
      description: 'I would like to know the capital of Pakistan',
    },
    {
      id: 28,
      question: 'What is the capital of Bangladesh?',
      description: 'I would like to know the capital of Bangladesh',
    },
    {
      id: 27,
      question: 'What is the capital of India?',
      description: 'I would like to know the capital of India',
    },
    {
      id: 26,
      question: 'What is the capital of Pakistan?',
      description: 'I would like to know the capital of Pakistan',
    },
    {
      id: 25,
      question: 'What is the capital of Bangladesh?',
      description: 'I would like to know the capital of Bangladesh',
    },
    {
      id: 24,
      question: 'What is the capital of India?',
      description: 'I would like to know the capital of India',
    },
    {
      id: 23,
      question: 'What is the capital of Pakistan?',
      description: 'I would like to know the capital of Pakistan',
    },
    {
      id: 22,
      question: 'What is the capital of Bangladesh?',
      description: 'I would like to know the capital of Bangladesh',
    },
    {
      id: 21,
      question: 'What is the capital of India?',
      description: 'I would like to know the capital of India',
    },
  ],
};

const questions2 = {
  data: [
    {
      id: 20,
      question: 'What is the capital of India?',
      description: 'I would like to know the capital of India',
    },
    {
      id: 19,
      question: 'What is the capital of Pakistan?',
      description: 'I would like to know the capital of Pakistan',
    },
    {
      id: 18,
      question: 'What is the capital of Bangladesh?',
      description: 'I would like to know the capital of Bangladesh',
    },
    {
      id: 17,
      question: 'What is the capital of India?',
      description: 'I would like to know the capital of India',
    },
    {
      id: 16,
      question: 'What is the capital of Pakistan?',
      description: 'I would like to know the capital of Pakistan',
    },
    {
      id: 15,
      question: 'What is the capital of Bangladesh?',
      description: 'I would like to know the capital of Bangladesh',
    },
    {
      id: 14,
      question: 'What is the capital of India?',
      description: 'I would like to know the capital of India',
    },
    {
      id: 13,
      question: 'What is the capital of Pakistan?',
      description: 'I would like to know the capital of Pakistan',
    },
    {
      id: 12,
      question: 'What is the capital of Bangladesh?',
      description: 'I would like to know the capital of Bangladesh',
    },
    {
      id: 11,
      question: 'What is the capital of India?',
      description: 'I would like to know the capital of India',
    },
  ],
};

const questions3 = {
  data: [
    {
      id: 10,
      question: 'What is the capital of India?',
      description: 'I would like to know the capital of India',
    },
    {
      id: 9,
      question: 'What is the capital of Pakistan?',
      description: 'I would like to know the capital of Pakistan',
    },
    {
      id: 8,
      question: 'What is the capital of Bangladesh?',
      description: 'I would like to know the capital of Bangladesh',
    },
    {
      id: 7,
      question: 'What is the capital of India?',
      description: 'I would like to know the capital of India',
    },
    {
      id: 6,
      question: 'What is the capital of Pakistan?',
      description: 'I would like to know the capital of Pakistan',
    },
    {
      id: 5,
      question: 'What is the capital of Bangladesh?',
      description: 'I would like to know the capital of Bangladesh',
    },
    {
      id: 4,
      question: 'What is the capital of India?',
      description: 'I would like to know the capital of India',
    },
    {
      id: 3,
      question: 'What is the capital of Pakistan?',
      description: 'I would like to know the capital of Pakistan',
    },
    {
      id: 2,
      question: 'What is the capital of Bangladesh?',
      description: 'I would like to know the capital of Bangladesh',
    },
    {
      id: 1,
      question: 'What is the capital of India?',
      description: 'I would like to know the capital of India',
    },
  ],
};

const replies = {
  data: [
    {
      id: 1,
      name: 'John Doe',
      reply: 'Yes',
      replyParent: null,
      when: 'less than a minute ago',
    },
    {
      id: 2,
      name: 'Abdul Qadir',
      reply: 'No',
      replyParent: null,
      when: 'less than a minute ago',
    },
    {
      id: 3,
      name: 'Bilal Khan',
      reply: 'Maybe',
      replyParent: 1,
      when: 'less than a minute ago',
    },
    {
      id: 4,
      name: 'Chaudhry Muhammad',
      reply: 'Yes',
      replyParent: 3,
      when: 'less than a minute ago',
    },
    {
      id: 5,
      name: 'Talha Khan',
      reply: 'No',
      replyParent: 2,
      when: 'less than a minute ago',
    },
    {
      id: 6,
      name: 'Acme Inc',
      reply: 'No',
      replyParent: 1,
      when: 'less than a minute ago',
    },
    {
      id: 7,
      name: 'Beta Inc',
      reply: 'No',
      replyParent: null,
      when: 'less than a minute ago',
    },
  ],
};

const API = {
  getQuestions: function (scroll) {
    switch (scroll) {
      case 1:
        return Promise.resolve(questions1);
      case 2:
        return Promise.resolve(questions2);
      case 3:
        return Promise.resolve(questions3);
      default:
        return Promise.reject(new Error('EOQ'));
    }
  },
  getReplies(questionId) {
    return Promise.resolve(replies);
  },
};

export default API;
