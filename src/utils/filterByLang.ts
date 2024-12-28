type Item = Record<string, any>;

type FilterByLang = (
  items: Item[], 
  lang: string, 
  ...fields: string[]
) => Item[];

const filterByLang: FilterByLang = (items = [], lang, ...fields) => {
  if (!lang) {
    throw new Error("Language parameter is required.");
  }

  const langSuffix = lang.charAt(0).toUpperCase() + lang.slice(1).toLowerCase().trim();

  return items.map((item) => {
    const newItem: Item = { ...(item._doc || item) };

    fields.forEach((field) => {
      const fieldPath = field.split(".");
      let target: any = newItem;

      for (let i = 0; i < fieldPath.length - 1; i++) {
        if (!target || !(fieldPath[i] in target)) {
          return;
        }
        target = target[fieldPath[i]];
      }

      const lastKey = fieldPath[fieldPath.length - 1];

      if (Array.isArray(target)) {
        target.forEach((subItem: Item) => {
          if (subItem && `${lastKey}${langSuffix}` in subItem) {
            subItem[lastKey] = subItem[`${lastKey}${langSuffix}`] || subItem[lastKey];
          }
        });
      } else if (target && `${lastKey}${langSuffix}` in target) {
        target[lastKey] = target[`${lastKey}${langSuffix}`] || target[lastKey];
      }
    });

    return newItem;
  });
};

export default filterByLang;
