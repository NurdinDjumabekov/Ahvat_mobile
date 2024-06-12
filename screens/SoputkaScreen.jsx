import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native";
import { FlatList } from "react-native";
import { RefreshControl } from "react-native";
import { getLocalDataUser } from "../helpers/returnDataUser";
import { changeLocalData } from "../store/reducers/saveDataSlice";
import { ViewButton } from "../customsTags/ViewButton";
import {
  clearListCategory,
  clearListProductTT,
  getHistorySoputka,
  getListAgents,
} from "../store/reducers/requestSlice";
import { formatCount } from "../helpers/amounts";
import { ModalCreateSoputka } from "../components/Soputka/ModalCreateSoputka";

export const SoputkaScreen = ({ navigation }) => {
  //// Сопутка
  const dispatch = useDispatch();

  const [modalState, setModalState] = useState(false);

  const { data } = useSelector((state) => state.saveDataSlice);

  const { preloader, listHistorySoputka } = useSelector(
    (state) => state.requestSlice
  );

  useEffect(() => {
    getData();

    return () => {
      dispatch(clearListCategory());
      dispatch(clearListProductTT());
      //// очищаю список категорий и товаров
    };
  }, []);

  const getData = async () => {
    await getLocalDataUser({ changeLocalData, dispatch });
    await dispatch(getHistorySoputka(data?.seller_guid));
    await dispatch(getListAgents({ seller_guid: data?.seller_guid }));
  };

  const nav = (guidInvoice) => {
    navigation.navigate("SoputkaProdHistoryScreen", { guidInvoice });
  };

  const openScaner = () => navigation.navigate("ScannerScreen");

  const openListDoctors = () => setModalState(true);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.soputkaBlock}>
          <ViewButton styles={styles.soputka} onclick={openScaner}>
            Отсканировать QR код врача
          </ViewButton>
          <ViewButton styles={styles.soputka} onclick={openListDoctors}>
            Выбрать врача в ручную
          </ViewButton>
        </View>
        <View style={styles.selectBlock}>
          <Text style={styles.title}>История продаж</Text>
          <FlatList
            data={listHistorySoputka}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={styles.everyProd}
                onPress={() => nav(item?.invoice_guid)}
              >
                <View style={styles.everyProdInner}>
                  <View style={styles.blockTitle}>
                    <Text style={styles.nameDoctor}>{item?.doctor}</Text>
                    <View style={styles.blockTitleInner}>
                      <Text style={styles.titleNum}>{index + 1} </Text>
                      <View>
                        <Text style={styles.date}>{item?.date}</Text>
                        <Text style={styles.sum}>
                          {formatCount(item?.total_price)} сомони
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.status}>
                    {item?.status === 0 ? (
                      <Text style={styles.bad}>Не подтверждено</Text>
                    ) : (
                      <Text style={styles.good}>Подтверждено</Text>
                    )}
                  </View>
                </View>
                {item?.comment && (
                  <Text style={styles.comment}>{item?.comment}</Text>
                )}
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item?.guid}
            refreshControl={
              <RefreshControl refreshing={preloader} onRefresh={getData} />
            }
          />
        </View>
      </SafeAreaView>
      <ModalCreateSoputka
        modalState={modalState}
        setModalState={setModalState}
        navigation={navigation}
      />
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    padding: 12,
    fontSize: 18,
    fontWeight: "500",
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: "rgba(47, 71, 190, 0.591)",
    color: "#fff",
    marginBottom: 5,
  },

  everyPoint: {
    backgroundColor: "rgba(162, 178, 238, 0.102)",
    minWidth: "100%",
    padding: 8,
    paddingBottom: 13,
    paddingTop: 15,
    borderBottomWidth: 1,
    borderColor: "rgba(47, 71, 190, 0.287)",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  activeCateg: {
    backgroundColor: "rgba(47, 71, 190, 0.672)",
    color: "#fff",
  },

  arrow: {
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: "rgba(47, 71, 190, 0.272)",
    height: 15,
    width: 15,
    borderRadius: 3,
    transform: [{ rotate: "45deg" }],
    marginRight: 20,
  },

  activeArrow: {
    borderColor: "#fff",
  },

  selectBlock: {
    height: "88%",
  },

  soputkaBlock: {
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    minWidth: "100%",
    gap: 10,
  },

  soputka: {
    fontSize: 14,
    color: "#fff",
    width: 170,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 8,
    paddingHorizontal: 10,
    fontWeight: "700",
    backgroundColor: "rgba(97 ,100, 239,0.7)",
    marginTop: 12,
    marginBottom: 12,
  },

  everyProd: {
    padding: 10,
    paddingVertical: 10,
    backgroundColor: "rgba(212, 223, 238, 0.47)",
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "rgba(47, 71, 190, 0.107)",
  },

  everyProdInner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },

  blockTitle: {
    width: "67%",
  },

  blockTitleInner: {
    display: "flex",
    flexDirection: "row",
    gap: 7,
    alignItems: "center",
  },

  titleNum: {
    fontSize: 19,
    fontWeight: "700",
    color: "rgba(47, 71, 190, 0.672)",
    borderColor: "rgba(47, 71, 190, 0.672)",
    borderWidth: 1,
    backgroundColor: "#d4dfee",
    padding: 4,
    paddingLeft: 7,
    paddingRight: 0,
    borderRadius: 5,
  },

  nameDoctor: {
    fontSize: 14,
    fontWeight: "400",
    color: "#222",
    lineHeight: 16,
    marginBottom: 5,
  },

  sum: {
    fontSize: 14,
    fontWeight: "500",
    color: "rgba(12, 169, 70, 0.9)",
    lineHeight: 16,
  },

  date: {
    fontSize: 14,
    fontWeight: "500",
    color: "rgba(47, 71, 190, 0.687)",
    lineHeight: 16,
  },

  comment: {
    fontSize: 14,
    fontWeight: "400",
    marginTop: 5,
  },

  status: {
    paddingRight: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "left",
  },

  good: {
    color: "rgba(12, 169, 70, 0.9)",
    fontSize: 12,
    fontWeight: "500",
    textAlign: "left",
  },
  bad: { color: "red", fontSize: 12, fontWeight: "500", textAlign: "left" },
});
