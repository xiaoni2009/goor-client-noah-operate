import { request } from 'Utils';

export async function QUERY(mac) {
    return request(`services/operation/mac/bind/query?mac=${mac}`);
}