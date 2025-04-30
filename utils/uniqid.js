import crypto from 'crypto';

const uniqid = () => {
    return crypto.randomUUID();
};

export default uniqid;