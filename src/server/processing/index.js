import axios from "axios";

export async function processTexts(texts) {
  const inputData = texts.map((text) => {
    return { doc_id: "id" + text.textId, text: text.rawContent };
  });

  const url = process.env.R_API_URL;
  try {
    const { data } = await axios.post(`${url}/essential`, {
      texts_collection: inputData,
    });

    const essentialWords = Object.entries(data)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map((entry) => {
        return {
          textId: Number(entry[0].substring(2)),
          essentialWords: entry[1],
        };
      });
    return essentialWords;
  } catch (err) {
    console.log(err);
    return err;
  }
}
