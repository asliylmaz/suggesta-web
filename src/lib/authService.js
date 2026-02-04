import api from "./api";

export const login = (data) =>
  api.post("/users/login", data).then((res) => res.data);

export const register = (data) =>
  api.post("/users/register", data).then((res) => res.data);
