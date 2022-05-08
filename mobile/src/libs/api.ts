import axios from "axios";

export const api = axios.create({
  baseURL: "YOUR_IP:PORT",
});
