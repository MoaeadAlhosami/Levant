import api from './index';
import type { Ad, Table } from '../types';

export async function loginAdmin(userName: string, password: string) {
  const form = new FormData();
  form.append('user_name', userName);
  form.append('password', password);
  const resp = await api.post<{ data: { token: string } }>(
    '/admin_api/login?model=Admin',
    form
  );
  return resp.data.data.token;
}

export function fetchAds() {
  return api.get<{ data: Ad[] }>('/admin_api/show_advertisements');
}

export function createAd(form: FormData) {
  return api.post<{ data: Ad }>(
    '/admin_api/add_advertisement',
    form,
    { headers: { 'Content-Type': 'multipart/form-data' } }
  );
}

export function updateAd(form: FormData) {
  return api.post<{ data: Ad }>('/admin_api/update_advertisement', form);
}

export function deleteAd(id: number) {
  return api.delete(`/admin_api/delete_advertisement?id=${id}`);
}

export function fetchTables() {
  return api.get<{ data: Table[] }>('/admin_api/show_tables');
}

export function createOrder(form: FormData) {
  return api.post('/admin_api/add_order', form);
}