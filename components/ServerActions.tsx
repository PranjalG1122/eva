"use server";

export async function submitQuery(query: string): Promise<{
  response: string;
  videoURL: string;
}> {
  return await fetch(process.env.API1!, {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ query: query }),
  }).then((res) => {
    return res.text().then(async (text) => {
      return await fetch(process.env.API2!, {
        method: "POST",
        headers: { "content-type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ text: text }),
      }).then((res) => {
        return res.text().then((videoURL) => {
          return {
            response: text,
            videoURL,
          };
        });
      });
    });
  });
}
