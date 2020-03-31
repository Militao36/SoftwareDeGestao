import redis from 'redis';

const redisClient = redis.createClient();

const getCache = (key: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        return redisClient.get(key, (err, value) => {
            if (err) {
                reject(err);
            } else {
                resolve(value);
            }
        });
    });
};

const setCache = (key: string, value: string) => {
    return new Promise((resolve, reject) => {
        redisClient.set(key, value, 'EX', 60, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve('OK');
            }
        });
    });
};

export default { Redis: redisClient, getCache, setCache };
