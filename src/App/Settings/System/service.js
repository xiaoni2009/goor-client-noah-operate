import { request, locals } from 'Utils';
const mac = locals.get('macAddress');
export async function QUERY(caption) {
    return request(`services/area/station/${caption}`);
}

export async function BIND(params) {
    params = {
        ...params,
        mac
    }
    return request('services/operation/mac/bind', { method: 'POST', body: JSON.stringify(params) })
}

export async function NOT_STATION(params) {
    return request(`services/operation/setting/notAccessOperation?operations=[${params}]`)
}
