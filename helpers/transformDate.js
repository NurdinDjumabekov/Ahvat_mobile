export const transformDate = (date) => {
  ///  2024-03-20T15:52:58.843Z  ===>  20.03.2024
  const newDate = new Date(date);

  const day = newDate.getDate().toString().padStart(2, "0");
  const month = (newDate.getMonth() + 1).toString().padStart(2, "0");
  const year = newDate.getFullYear();

  const formattedDate = `${day}.${month}.${year}`;
  return formattedDate;
};
