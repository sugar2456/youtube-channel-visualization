export function splitString(separatedString: string, delimiter: string): string[] {
  if (!separatedString || !delimiter) {
    throw new Error("入力文字列と区切り文字を指定してください。");
  }
  return separatedString.split(delimiter);
}

export function parseLinkHeaders(linkHeaders: string[]): { url: string; rel: string }[] {
  return linkHeaders.map((header) => {
    const match = header.match(/<(.+?)>; rel="(.+?)"/);
    if (match) {
      const [, url, rel] = match;
      return { url, rel };
    }
    throw new Error(`ヘッダーのフォーマットが不正です: ${header}`);
  });
}

export function getQueryParams(url: string): Record<string, string> {
  const params: Record<string, string> = {};
  const queryString = url.split("?")[1];
  if (!queryString) {
    return params;
  }

  queryString.split("&").forEach((param) => {
    const [key, value] = param.split("=");
    if (key) {
      params[key] = decodeURIComponent(value || "");
    }
  });

  return params;
}

export function convertNewLineToBr(text: string): string {
  if (!text) {
    return '';
  }
  return text.replace(/\n/g, '<br>');
}