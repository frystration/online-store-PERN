import {$authHost, $host} from "./index";

export const createBasketDevice = async (deviceId) => {
    const {data} = await $authHost.post('api/basket', deviceId)
    return data
}

export const fetchBasket = async () => {
    const {data} = await $authHost.get('api/basket')
    return data
}