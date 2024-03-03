import axios from 'axios';
import Notiflix from 'notiflix';

export const fetchBreeds = () => {
  breedList = [{ text: 'Choose breed', value: '1', disabled: true }];
  axios.defaults.headers.common['x-api-key'] =
    'live_rppLWDqrF7GRbyg80GB6LarZCtJHJNCF5MSE72DSBcetOqiyl44xAJDxPnmqVmUg';
  return axios
    .get(`https://api.thecatapi.com/v1/breeds`)
    .then(result => {
      result.data.map(({ id, name }) => {
        breedList.push({ text: name, value: id });
      });
      return breedList;
    })
    .catch(() => {
      Notiflix.Notify.failure('Error, try to reload page.');
    });
};

export const fetchCatByBreed = breedId => {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then(result => result.data)
    .catch(() => {
      Notiflix.Notify.failure('Error, try to reload page.');
    });
};
