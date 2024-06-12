import { SafeAreaView, FlatList, RefreshControl, Image } from "react-native";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { ViewContainer } from "../customsTags/ViewContainer";
import { dataCategory } from "../helpers/Data";
import { EveryCategory } from "../components/EveryCategory";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { getBalance } from "../store/reducers/requestSlice";
import { getLocalDataUser } from "../helpers/returnDataUser";
import { changeLocalData } from "../store/reducers/saveDataSlice";
import imgQRCode from "../assets/icons/qr_code.png";

export const MainScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.saveDataSlice);
  const { preloader, balance } = useSelector((state) => state.requestSlice);

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  const getData = async () => {
    await getLocalDataUser({ changeLocalData, dispatch });
    await dispatch(getBalance(data?.seller_guid));
  };

  const goPage = () => navigation.navigate("HistoryBalance");

  const goScaner = () => navigation.navigate("ScannerScreen");

  return (
    <ViewContainer>
      <SafeAreaView>
        <View style={styles.parentBlock}>
          {/* <TouchableOpacity style={styles.balance} onPress={goPage}>
            <View>
              <View style={styles.balanceInner}>
                <Text style={styles.balanceText}>Бонусы</Text>
                <View style={styles.arrow}></View>
              </View>
              <Text style={styles.balanceNum}>{balance || 0} сомони</Text>
            </View>
            <Text style={styles.balanceHistory}>История</Text>
          </TouchableOpacity> */}
          <FlatList
            contentContainerStyle={styles.flatList}
            data={dataCategory}
            renderItem={({ item }) => (
              <EveryCategory obj={item} navigation={navigation} />
            )}
            keyExtractor={(item) => item.codeid}
            numColumns={2}
            refreshControl={
              <RefreshControl refreshing={preloader} onRefresh={getData} />
            }
            columnWrapperStyle={{
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
          />
        </View>
      </SafeAreaView>
      <TouchableOpacity style={styles.imgQRCodeBlock} onPress={goScaner}>
        <Image style={styles.imgQRCode} source={imgQRCode} />
      </TouchableOpacity>
    </ViewContainer>
  );
};

const styles = StyleSheet.create({
  parentBlock: {
    minWidth: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
  },

  flatList: {
    minWidth: "100%",
    // alignItems: "center",
    gap: 10,
    paddingBottom: 10,
    marginTop: 20,
  },

  balance: {
    width: "97%",
    alignSelf: "center",
    marginBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: "rgba(47, 71, 190, 0.591)",
    paddingVertical: 10,
    borderRadius: 8,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  balanceText: {
    lineHeight: 18,
    fontWeight: "700",
    color: "#fff",
    fontSize: 17,
  },

  balanceNum: {
    fontWeight: "500",
    color: "#fff",
    fontSize: 17,
    marginTop: 5,
  },

  balanceHistory: {
    fontWeight: "400",
    color: "#fff",
    fontSize: 18,
    lineHeight: 20,
  },

  balanceInner: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  arrow: {
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: "#fff",
    height: 10,
    width: 10,
    borderRadius: 3,
    transform: [{ rotate: "45deg" }],
    marginRight: 20,
  },

  imgQRCodeBlock: {
    width: 65,
    height: 65,
    position: "absolute",
    bottom: 65,
    backgroundColor: "#43b7f2",
    alignSelf: "center",
    borderRadius: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  imgQRCode: {
    width: "90%",
    height: "90%",
    borderRadius: 15,
  },
});
