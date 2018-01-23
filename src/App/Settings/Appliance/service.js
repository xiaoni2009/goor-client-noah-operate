import { request } from 'Utils';

export async function QUERY({ page = 1, pageSize = 10 }) {
    return request(`appliance?page=${page}&pageSize=${pageSize}`);
  }