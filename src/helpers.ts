export function getPageFromSearch(search: string) {
  const query = search.slice(1);

  if (query.includes("&page")) {
    const arr = query.split("&");
    const x = arr.find((item) => item.indexOf("page") === 0);
    if (x) {
      return Number(x.split("=")[1]);
    }
    return 1;
  } else {
    return 1;
  }
}
