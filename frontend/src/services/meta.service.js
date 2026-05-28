import apiClient from '../api/apiClient';

export const getPreferencesMeta = () => {
  return apiClient
    .post('/meta/preferences')
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
