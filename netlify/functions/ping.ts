exports.handler = async (event: any, context: any) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    return {
      statusCode: 200,
      body: JSON.stringify({ error: "Pong" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "Internal Server Error",
    };
  }
};
