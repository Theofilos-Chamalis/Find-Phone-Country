import AsyncStorage from '@react-native-community/async-storage';

export const saveRecord = async (payload) => {
    try {
        await AsyncStorage.setItem(
            new Date().getTime().toString(),
            JSON.stringify(payload)
        );
    } catch (error) {
        console.log(`Error storing the data: ${error}`);
    }
};

export const getRecord = async (key) => {
    try {
        return (await AsyncStorage.getItem(key)) || '';
    } catch (error) {
        console.log(`Error retrieving single record: ${error}`);
    }
};

export const deleteRecord = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.log(`Error deleting single record: ${error}`);
    }
};

export const getAllRecordKeys = async () => {
    try {
        return await AsyncStorage.getAllKeys();
    } catch (error) {
        console.log(`Error retrieving all keys: ${error}`);
    }
};

export const getAllRecords = async () => {
    return getAllRecordKeys()
        .then((keysArray) => {
            return AsyncStorage.multiGet(keysArray, (err, resultArray) => {
                err ? console.log(`Error retrieving all items: ${err}`) : resultArray;
            });
        })
        .catch((err) => {
            console.log(`Error getting all records: ${err}`);
        });
};

export const clearAllRecords = async () => {
    try {
        await AsyncStorage.clear();
    } catch (error) {
        console.log(`Error clearing all records: ${error}`);
    }
};
