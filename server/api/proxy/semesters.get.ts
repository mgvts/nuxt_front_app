export default defineEventHandler(async (event) => {
  const response = await $fetch("http://84.201.151.242:8080/api/v1/semesters", {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });

  return response;
});
