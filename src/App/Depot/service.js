import { request } from 'Utils';

export async function QUERY() {
    return request(`services/operation/order`);
}