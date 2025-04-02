import {users}  from '../../data'

// @TODO: actually here need axios on backend
export default defineEventHandler(() => {
    if (!users) {
      throw createError({
        statusCode: 404,
        statusMessage: "User not found",
      });
    }
  
    return users;
  });
  