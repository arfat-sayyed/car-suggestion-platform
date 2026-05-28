import apiClient from '../api/apiClient';

export const getRecommendations = (payload) => {
  return apiClient.post('/recommendations', payload);
};
