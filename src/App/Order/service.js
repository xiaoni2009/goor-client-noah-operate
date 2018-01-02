import { request } from 'Utils';

export async function POST(params) {
    return request('services/operation/order', { method: 'POST', body: JSON.stringify(params) })
}