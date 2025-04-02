import {users}  from '../../data'

// @TODO: actually here need axios on backend
export default defineEventHandler((event) => {
  const userId = event.context.params?.id;

  const user = users.find((user) => user.id === userId);

  if (!user) {
    throw createError({
      statusCode: 404,
      statusMessage: "User not found",
    });
  }

  return user;
});
