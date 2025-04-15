import axios, { type AxiosRequestConfig } from "axios";

const axiosConf: AxiosRequestConfig = {
  baseURL: "/api",
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJraXJhdG5pbmUiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3NDQ3NTE3OTAsImV4cCI6MTc0NjIyMzAxOX0.epnVOnjX443BYsmkEEHXi7-R234tuuPrML5mcZLnq1SIU7F-wpgfEec7mtqwyD7QEj5ySrIuVB27vJzZXWbQ7g'
  },
};

export const wrapGet =
  (resourcePath: string) =>
  <T>(suffix = "", config: AxiosRequestConfig = {}): Promise<T> =>
    axios
      .get(`${resourcePath}${suffix}`, { ...axiosConf, ...config })
      .then((res) => res.data);

export function get<Request>(
  url: string,
  config: AxiosRequestConfig
): Promise<Request> {
  return axios.get(url, config);
}
