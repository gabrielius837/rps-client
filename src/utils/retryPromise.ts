/**
 * @param promise An RPC request promise to be resolved
 * @retries Number of tries before rejecting
 * @returns resolved promise
 */
const retryPromise = async <T = any>(promise: Promise<T>, retries: number): Promise<T> => {
    try {
        const data = await promise;
        return data;
    } catch (error) {
        if (retries === 0)
            throw error;
        
        return await retryPromise(promise, retries - 1);
    }
}

export default retryPromise;
