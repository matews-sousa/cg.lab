export async function GET(request: Request) {
  const userSession = request.headers
    .get("cookie")
    ?.split("_convexAuthJWT=")[1]; // Change "userSession" to the actual cookie name
  return new Response(JSON.stringify({ userSession }), {
    headers: {
      "content-type": "application/json",
    },
  });
}
