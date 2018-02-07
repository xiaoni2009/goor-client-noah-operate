import { request, locals } from 'Utils';
const mac = locals.get('macAddress');

export async function QUERY() {
    return request(`services/operation/mac/bind?mac=${mac}`);
}