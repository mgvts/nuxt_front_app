import axios from "axios";



export default defineEventHandler(async (event) => {
  const response = await axios.get("http://84.201.151.242:8080/api/v1/semesters", {
  });
  return response.data;
});
