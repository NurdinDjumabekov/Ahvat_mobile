export const transformListForSelect = (list) => {
  const newList = list?.map(({ fio, guid }, ind) => ({
    label: `${ind + 1}. ${fio}`,
    value: guid,
  }));
  return newList;
};
