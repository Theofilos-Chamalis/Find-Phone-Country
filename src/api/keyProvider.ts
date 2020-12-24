import APIKeys from './keys';

// Keys are registered at numverify.com for free (limit 250 req/month)
const returnRandomAPIKey = () => {
    return APIKeys[Math.floor(Math.random() * APIKeys.length)];
};

export default returnRandomAPIKey;
