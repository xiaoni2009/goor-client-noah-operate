import { request } from 'Utils';

export async function QUERY({ page = 1, pageSize = 10, name = '' }) {
	let queryObj = '';
	if(name) {
		queryObj = encodeURI(JSON.stringify({ searchName: name }));
	}
  return request(`operation/type?page=${page}&pageSize=${pageSize}&queryObj=${queryObj}`);
}

export async function POST(params) {
  if(params.id) {
    return request('operation/type', { method: 'PUT', body: JSON.stringify(params) })
  }else {
    return request('operation/type', { method: 'POST', body: JSON.stringify(params) })
  }
}

export async function DELETE(id) {
  return request(`operation/type/${id}`, { method: 'DELETE' })
}

export async function SEARCHNAME(searchName) {
return request(`services/appliance/searchName?searchName=${searchName}`);
}

export async function DEPARTMENTTYPE() {
  return request(`operation/departmentType?page=1&pageSize=1000`);
  }

export async function DEPARTMENTTYPEPOST(params) {
  if(params.id) {
    return request('operation/departmentType', { method: 'PUT', body: JSON.stringify(params) })
  }else {
    return request('operation/departmentType', { method: 'POST', body: JSON.stringify(params) })
  }
}

export async function DEPARTMENTTYPEDELETE(id) {
  return request(`operation/departmentType/${id}`, { method: 'DELETE' })
}