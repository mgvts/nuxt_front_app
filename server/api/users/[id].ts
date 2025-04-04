import axios from 'axios';

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;
  try {
    const { data } = await axios.get(
      `https://uplifting-vacation-cbe78831e4.strapiapp.com/api/profiles?populate=*&filters[id][$eq]=${id}`
    );
    return data.data[0];
  } catch (error) {
    console.error(error)
    event.res.statusCode = 500;
    return { error: `Ошибка при получении данных пользователя с id: ${id}` };
  }
});
