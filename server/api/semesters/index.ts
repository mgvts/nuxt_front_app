import axios from "axios";



export default defineEventHandler(async (event) => {
  console.log('trigger semester server handler')
  const response = await $fetch("http://84.201.151.242:8080/api/v1/semesters", {
  });
  return response;
});
