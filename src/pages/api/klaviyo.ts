import type { APIRoute } from "astro";

export const prerender = true;

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const email = data.get("email");

  if (!email) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
      }),
      { status: 400 },
    );
  }

  return new Response(
    JSON.stringify({
      message: "Success!",
    }),
    { status: 200 },
  );
};
