import alfy from "alfy";

const { ENDPOINT, AUTH_TOKEN } = process.env;

// alfy.log(`Memos - ${ENDPOINT} ${AUTH_TOKEN}`);

// See https://github.com/sindresorhus/alfy?tab=readme-ov-file#example

const memos = await alfy.fetch(
  `${ENDPOINT}/api/v1/memos?pageSize=10&filter=content_search==["${alfy.input}"]`,
  {
    headers: {
      Authorization: `Bearer ${AUTH_TOKEN}`,
      "Content-Type": "application/json",
    },
    transform: (response) =>
      response.memos.map((memo) => ({
        title: memo.snippet,
        subtitle: memo.updateTime,
        arg: `${ENDPOINT}/m/${memo.uid}`,
      })),
  }
);

if (memos.length > 0) {
  alfy.output(memos);
} else {
  alfy.output([
    {
      title: "Create new...",
      subtitle: "Open Memos in your browser",
      arg: `${ENDPOINT}/home`,
    },
  ]);
}
