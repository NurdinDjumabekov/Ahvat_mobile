import AsyncStorage from "@react-native-async-storage/async-storage";

export const returnDataUser = async () => {
  /////   для вызова данных с AsyncStorage
  try {
    const seller_guid = await AsyncStorage.getItem("seller_guid");
    const seller_fio = await AsyncStorage.getItem("seller_fio");
    const point_name = await AsyncStorage.getItem("point_name");
    // const agent_guid = await AsyncStorage.getItem("agent_guid");
    if (seller_guid !== null && seller_fio !== null && point_name !== null) {
      // Данные успешно найдены
      //   console.log("найден:", seller_guid, seller_fio, point_name);
      const data = {
        seller_guid,
        seller_fio,
        point_name,
        // agent_guid,
      };
      return data; // Возвращаем значение seller_guid
    } else {
      // Нет данных в AsyncStorage
      //   console.log("seller_guid не найден.");
      return null; // Возвращаем null, если нет данных
    }
  } catch (error) {
    // Обработка ошибки при чтении данных из AsyncStorage
    // console.error("Ошибка при чтении seller_guid из AsyncStorage:", error);
    return null; // Возвращаем null в случае ошибки
  }
};

////  useEffect(() => {
////   getLocalDataUser({ changeLocalData, dispatch });
////   }, []);

export const getLocalDataUser = async ({ changeLocalData, dispatch }) => {
  const data = await returnDataUser();
  dispatch(changeLocalData(data));
};
