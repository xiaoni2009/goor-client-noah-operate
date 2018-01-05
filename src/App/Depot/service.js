import { request } from 'Utils';

export async function QUERY() {
    let queryObj = encodeURI(JSON.stringify({ state: 1 }));
    return request(`services/operation/order?&queryObj=${queryObj}`);
}

export async function ORDERRECEIVE(id) {
    return request(`services/operation/order/receive/${id}`);
}

export async function ORDERHANDLE(id) {
    return request(`services/operation/order/handle/${id}`);
}