import {request} from 'Utils';

export async function QUERY(searchName) {
  return request(`services/appliance/searchName?searchName=${searchName}`);
}