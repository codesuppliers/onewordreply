import axios from 'axios';

const API = {
  getQuestions: function (url) {
    return axios.get(url);
  },
  getReplies(questionId) {
    return axios.get('/api/replies/' + questionId);
  },
  postQuestion: function (data) {
    return axios.post('/api/questions', data);
  },
  postReply: function (questionId, data) {
    return axios.post('/api/replies/' + questionId, data);
  },
};

export default API;
