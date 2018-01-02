import {request} from 'Utils';

export async function QUERY(searchName) {
  return request(`services/operation/type/searchName?searchName=${searchName}`);
}