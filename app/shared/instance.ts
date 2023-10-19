import axios from 'axios';

export const instance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  withCredentials: true,
  headers: {},
});

// instance.defaults.withCredentials = true;
instance.defaults.headers.common.Accept = 'application/json';
instance.defaults.headers.common['Content-Type'] = 'application/json';

instance.interceptors.request.use(
  (config) => config,
  async (error) => {
    console.log('====================================');
    console.log('interceptor error', error);
    console.log('====================================');

    // const { access_token } = await getAccessToken();

    // console.log('====================================');
    // console.log('when exp', access_token);
    // console.log('====================================');

    return Promise.reject(error);
  },
);

export default instance;
