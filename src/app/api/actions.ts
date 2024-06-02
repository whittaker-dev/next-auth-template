"use server";

interface NextOptions {
  revalidate?: false | 0 | number;
  tags?: string[];
}

const _fetch = async (
  url: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE" = "GET",
  body?: any,
  options: NextOptions = {},
  cache: "force-cache" | "no-store" = "no-store"
) => {
  const accessToken = "";

  const request: RequestInit = {
    headers: {
      "Content-Type": "application/json",
    },
    method,
    next: options,
  };

  if (accessToken) {
    request.headers = {
      ...request.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }

  if (body) {
    request.body = JSON.stringify(body);
  }

  if (!Object.keys(options).length) {
    request.cache = cache;
  }

  try {
    const response = await fetch(process.env.API_URL + url, request);

    if (!response.ok) {
      console.error("API request failed with response", response);
      throw new Error(`API request failed with status ${response.status}`);
    }

    return response.json();
  } catch (error: any) {
    console.error(error);
    throw error;
  }
};
export { _fetch };
