import axios from "axios";
import { headers } from "./headers";

export const onFetcher = async (endpoint) =>
  axios
    .get(`${import.meta.env.VITE_BACKEND_URL}${endpoint}`, {
      headers: headers,
    })
    .then((response) => response.data);
