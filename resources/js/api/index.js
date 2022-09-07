import axios from 'axios';

const API = {
  getQuestions: function (url) {
    return axios.get(url);
  },
  getReplies(questionId) {
    return axios.get('/api/replies/' + questionId);
  },
};

export default API;
