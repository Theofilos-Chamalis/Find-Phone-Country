import APIKeys from './keys';

// Keys are registered at numverify.com for free (limit 250 req/month)
const returnRandomAPIKey = () => {
  const key = APIKeys[Math.floor(Math.random() * APIKeys.length)];
  return key;
};

export default returnRandomAPIKey;
