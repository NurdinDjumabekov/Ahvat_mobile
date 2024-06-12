import { FlatList, RefreshControl, StyleSheet, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { View } from "react-native";
import { getLocalDataUser } from "../helpers/returnDataUser";
import { changeLocalData } from "../store/reducers/saveDataSlice";
import { getHistoryBalance } from "../store/reducers/requestSlice";

export const HistoryBalance = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.saveDataSlice);

  const { preloader, listHistoryBalance } = useSelector(
    (state) => state.requestSlice
  );

  //   console.log(listHistoryBalance, "listHistoryBalance");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await getLocalDataUser({ changeLocalData, dispatch });
    await dispatch(getHistoryBalance(data?.seller_guid));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={listHistoryBalance}
        renderItem={({ item, index }) => (
          <View style={styles.everyProd}>
            <View style={styles.everyProdInner}>
              <View style={styles.blockTitle}>
                <View style={styles.blockTitleInner}>
                  <Text style={styles.titleNum}>{index + 1} </Text>
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
        )}
        keyExtractor={(item) => item?.codeid}
        refreshControl={
          <RefreshControl refreshing={preloader} onRefresh={getData} />
        }
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingVertical: 20,
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
