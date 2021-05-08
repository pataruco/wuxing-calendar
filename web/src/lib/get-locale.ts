const unique = (array: string[]) =>
  array.filter((element, index, self) => self.indexOf(element) === index);

const normalizeLocales = (array: string[]) =>
  array.map((element) => {
    if (
      !element ||
      element.indexOf('-') === -1 ||
      element.toLowerCase() !== element
    ) {
      return element;
    }

    const splitElement = element.split('-');
    return `${splitElement[0]}-${splitElement[1].toUpperCase()}`;
  });

export const getUserLocales = () => {
  let languageList: string[] = [];

  if (typeof window !== 'undefined') {
    const { navigator } = window;

    if (navigator.languages) {
      languageList = languageList.concat(navigator.languages);
    }
    if (navigator.language) {
      languageList.push(navigator.language);
    }
    // @ts-ignore
    if (navigator.userLanguage) {
      // @ts-ignore
      languageList.push(navigator.userLanguage);
    }
    // @ts-ignore
    if (navigator.browserLanguage) {
      // @ts-ignore
      languageList.push(navigator.browserLanguage);
    }
    // @ts-ignore
    if (navigator.systemLanguage) {
      // @ts-ignore
      languageList.push(navigator.systemLanguage);
    }
  }

  languageList.push('en-GB'); // Fallback

  return normalizeLocales(unique(languageList));
};
