import returnRandomAPIKey from './keyProvider';

const fetchNumberInfo = async (phoneNumber) => {
    const numVerifyUrl = `http://apilayer.net/api/validate?access_key=${returnRandomAPIKey()}&number=${phoneNumber}&country_code=&format=1`;

    try {
        const response = await fetch(numVerifyUrl);
        return await response.json();
    } catch (error) {
        return 'error';
    }
};

export default fetchNumberInfo;
