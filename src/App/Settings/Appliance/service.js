import { request } from "Utils";

export async function QUERY({ page = 1, pageSize = 10, name = '' }) {
	let queryObj = '';
	if(name) {
		queryObj = encodeURI(JSON.stringify({ searchName: name }));
	}
  return request(`appliance?page=${page}&pageSize=${pageSize}&queryObj=${queryObj}`);
}

export async function POST(params) {
  if (params.id) {
    return request("appliance", {
      method: "PUT",
      body: JSON.stringify(params)
    });
  } else {
    return request("appliance", {
      method: "POST",
      body: JSON.stringify(params)
    });
  }
}

export async function DELETE(id) {
  return request(`appliance/${id}`, { method: "DELETE" });
}

export async function PACKAGETYPE() {
  return request(`appliance/packageType?page=1&pageSize=1000`);
}

export async function PACKAGETYPEDELETE(id) {
  return request(`appliance/packageType/${id}`, { method: 'DELETE' })
}

export async function PACKAGETYPEPOST(params) {
  if(params.id) {
    return request('appliance/packageType', { method: 'PUT', body: JSON.stringify(params) })
  }else {
    return request('appliance/packageType', { method: 'POST', body: JSON.stringify(params) })
  }
}