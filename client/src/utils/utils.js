export function shortenText(text,showLength = 10) {
    if (typeof text !== 'string') {
        console.warn('shortenText: Expected a string');
        return '';
      }
      return text.length > showLength ? text.slice(0, showLength) + '...' : text;
  }
  