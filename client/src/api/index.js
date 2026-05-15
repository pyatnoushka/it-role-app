const BASE = "";

const PROTECTED_ROLE_IDS = [
  "0de7600adec9adb3ad47240cc95767ed",
  "0e2ee116e0aaf8667858476a61baf0a9",
  "34bccd16c3641c0c756804996642b816",
  "357b2d5613a6ee01c3ca4665e79f1ba9",
  "799b5a3adbd3294ac004d01f5c2c4096",
];

export { PROTECTED_ROLE_IDS };

export const itRoleApi = {
  list: () => fetch(`${BASE}/itRole/list`).then((r) => r.json()),
  get: (id) => fetch(`${BASE}/itRole/get?id=${id}`).then((r) => r.json()),
  create: (data) =>
    fetch(`${BASE}/itRole/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json()),
  delete: (id) =>
    fetch(`${BASE}/itRole/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    }).then((r) => r.json()),
};

export const questionApi = {
  list: () => fetch(`${BASE}/question/list`).then((r) => r.json()),
  test: () => fetch(`${BASE}/question/test`).then((r) => r.json()),
  create: (data) =>
    fetch(`${BASE}/question/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json()),
  delete: (id) =>
    fetch(`${BASE}/question/delete`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    }).then((r) => r.json()),
};