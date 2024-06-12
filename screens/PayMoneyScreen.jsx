import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native";
import { RefreshControl } from "react-native";
import { getLocalDataUser } from "../helpers/returnDataUser";
import { changeLocalData } from "../store/reducers/saveDataSlice";
import { ModalPayTA } from "../components/ModalPayTA";
import { ViewButton } from "../customsTags/ViewButton";
import {
  clearListAgents,
  getHistoryBalance,
  getListAgents,
} from "../store/reducers/requestSlice";
import { ScrollView } from "react-native";

export const PayMoneyScreen = ({ navigation }) => {
  //// оплата ТА (принятие денег ТА)

  const dispatch = useDispatch();
  const [modalState, setModalState] = useState(false);

  const { data } = useSelector((state) => state.saveDataSlice);

  const { preloader, listHistoryBalance } = useSelector(
    (state) => state.requestSlice
  );

  useEffect(() => {
    getData();

    return () => dispatch(clearListAgents());
  }, []);

  const getData = async () => {
    await getLocalDataUser({ changeLocalData, dispatch });
    await dispatch(getHistoryBalance(data?.seller_guid));
    await dispatch(getListAgents({ seller_guid: data?.seller_guid }));
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={styles.payBlock}>
          <ViewButton styles={styles.pay} onclick={() => setModalState(true)}>
            + Произвести оплату
          </ViewButton>
        </View>
        <Text style={styles.title}>История оплат</Text>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={preloader} onRefresh={getData} />
          }
          style={styles.listContent}
        >
          {listHistoryBalance?.map((item, index) => (
            <View style={styles.everyProd}>
              <View style={styles.everyProdInner}>
                <View style={styles.blockTitle}>
                  <View style={styles.blockTitleInner}>
                    <Text style={styles.titleNum}>
                      {listHistoryBalance.length - index}{" "}
                    </Text>
                    <Text style={styles.date}>{item?.date_system}</Text>
                  </View>
                  <Text style={styles.comment}>{item.comment || "..."}</Text>
                </View>
                <View style={styles.status}>
                  <Text style={styles.good}>Успешно</Text>
                  <Text style={styles.sum}>{item.total} сомони</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
      <ModalPayTA
        modalState={modalState}
        setModalState={setModalState}
        navigation={navigation}
      />
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    padding: 8,
    fontSize: 18,
    fontWeight: "500",
    paddingBottom: 10,
    paddingTop: 10,
    backgroundColor: "rgba(47, 71, 190, 0.591)",
    color: "#fff",
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

  listContent: {
    maxHeight: "82%",
  },

  titleNum: {
    fontSize: 16,
    fontWeight: "500",
    color: "rgba(47, 71, 190, 0.672)",
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

  payBlock: {
    textAlign: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    minWidth: "100%",
  },

  pay: {
    fontSize: 16,
    color: "#fff",
    minWidth: "95%",
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 10,
    fontWeight: 600,
    backgroundColor: "rgba(97 ,100, 239,0.7)",
    marginTop: 20,
    marginBottom: 20,
  },

  everyProd: {
    padding: 15,
    paddingVertical: 10,
    backgroundColor: "rgba(212, 223, 238, 0.47)",
    marginBottom: 10,
    borderRadius: 6,
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
    padding: 0,
    paddingLeft: 7,
    paddingRight: 0,
    borderRadius: 5,
  },

  date: {
    fontSize: 17,
    fontWeight: "500",
    color: "rgba(47, 71, 190, 0.687)",
  },

  comment: {
    fontSize: 14,
    fontWeight: "400",
    marginTop: 5,
  },

  status: {
    paddingRight: 20,
  },

  sum: {
    fontSize: 15,
    fontWeight: "400",
    color: "rgba(12, 169, 70, 0.9)",
  },

  good: { color: "rgba(12, 169, 70, 0.9)", fontSize: 16, fontWeight: "500" },
});
