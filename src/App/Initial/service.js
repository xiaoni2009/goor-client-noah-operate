import { request } from 'Utils';

export async function BIND(params) {
    return request('services/operation/mac/bind', { method: 'POST', body: JSON.stringify(params) })
}

export async function QUERY(caption) {
    return request(`services/area/station/${caption}`);
}