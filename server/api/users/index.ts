import axios from 'axios';

export default defineEventHandler(async (event) => {
  console.log(event)
  try {
    const { data } = await axios.get(
      'https://uplifting-vacation-cbe78831e4.strapiapp.com/api/profiles?populate=*'
    );
    return data.data;
  } catch (error) {
    console.error(error)
    event.res.statusCode = 500;
    return { error: 'Ошибка при получении данных пользователей.' };
  }
});
