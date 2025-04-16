// server/api/[...proxy].ts

export default defineEventHandler(async (event) => {
    // Базовый URL внешнего API
    const base = "http://84.201.151.242:8080/api/v1";
  
    // Динамический параметр "proxy" для подстановки URL из запроса.
    // Если запрос, к примеру, /api/semesters или /api/lectures/some-slug,
    // то значение параметра будет либо строкой, либо массивом строк.
    const { proxy } = event.context.params;
    const proxyPath = Array.isArray(proxy) ? proxy.join('/') : proxy;
  
    // Собираем конечный URL для запроса
    let target = `${base}/${proxyPath}`;
  
    // Добавляем query-параметры, если они есть
    const query = getQuery(event);
    if (Object.keys(query).length > 0) {
      const qs = new URLSearchParams(query as Record<string, string>).toString();
      target += `?${qs}`;
    }
  
    // Собираем заголовки запроса с клиента
    // При этом удаляем заголовок host, чтобы не возникало проблем
    const headers = { ...getRequestHeaders(event) };
    delete headers.host; 
  
    // Читаем тело запроса, если метод не GET/HEAD (это важно для POST-запросов, например, комментирования)
    let body;
    if (event.req.method !== 'GET' && event.req.method !== 'HEAD') {
      body = await readBody(event);
    }
  
    try {
      // Переправляем запрос во внешний API с помощью $fetch,
      // при этом метод, заголовки и тело передаются без изменений.
      const result = await $fetch(target, {
        method: event.req.method,
        headers,
        body,
        // Можно указать дополнительные опции, если потребуется обрабатывать ошибки или настраивать кэширование.
      });
      return result;
    } catch (error) {
      // Логируем ошибку для отладки (на Vercel это можно увидеть в логах деплоя)
      console.error("Ошибка прокси:", error);
      // Можно выбросить ошибку дальше или вернуть объект с описанием ошибки.
      throw error;
    }
  });
  