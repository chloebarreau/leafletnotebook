const url =
  "https://newsapi.org/v2/top-headlines?country=us?q=apple&apiKey=3260f1f5672447929f1fb8f3ec7199f4";

export async function getNews() {
  let result = await fetch(url).then(response => response.json());
  return result.articles;
}