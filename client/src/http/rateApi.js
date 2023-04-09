import {$authHost} from "./index";

export const createRate = async (deviceId, rate) => {
    const {data} = await $authHost.post('api/rating', deviceId, rate)
    return data
}

export const checkIsRate = async (deviceId) => {
    const {data} = await $authHost.get('api/rating', {
        params: {
            deviceId
        }
    })
    return data
}