import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { View, Text, ScrollView, Image } from "react-native";
import { StyleSheet, TouchableOpacity } from "react-native";
import { clearListProductTT } from "../store/reducers/requestSlice";
import { changeSearchProd } from "../store/reducers/stateSlice";
import { SearchProds } from "../components/Soputka/SearchProds";
import { ListSoldProduct } from "../components/Soputka/ListSoldProduct";

///imgs
import imgQr from "../assets/icons/qr_code.png";
import { AddProducts } from "../components/Soputka/AddProducts";

export const AddProdSoputkaSrceen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { guid } = route.params?.forAddTovar; ////guid созданной накладной

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <SearchProds disable={true} navigation={navigation} guid={guid} />
      ),
    });

    return () => {
      dispatch(clearListProductTT());
      dispatch(changeSearchProd(""));
    };
    //// очищаю список категорий и товаров
  }, []);

  const openScanerAddProd = () => {
    navigation.navigate("ScannerProdScreen", { guid });
    ////guid созданной накладной
  };

  return (
    <View style={styles.parentBlock}>
      <ScrollView style={styles.childBlock}>
        <TouchableOpacity onPress={openScanerAddProd} style={styles.arrow}>
          <Text style={styles.textBtn}>Продать товар</Text>
          <View style={styles.arrowInner}></View>
        </TouchableOpacity>
        <Text style={styles.textTovar}>Список товаров</Text>
        <ListSoldProduct guidInvoice={guid} navigation={navigation} />
      </ScrollView>
      <TouchableOpacity onPress={openScanerAddProd} style={styles.btnScaner}>
        <Image source={imgQr} style={styles.imgQR} />
      </TouchableOpacity>
      <AddProducts guid={guid} />
      {/* ///// модалка для добавления товаров */}
    </View>
  );
};

const styles = StyleSheet.create({
  parentBlock: {
    flex: 1,
    backgroundColor: "#ebeef2",
    position: "relative",
  },

  childBlock: {
    flex: 1,
    backgroundColor: "#ebeef2",
    marginBottom: 40,
  },

  arrow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: "rgba(12, 169, 70, 0.886)",
    marginBottom: 0,
  },

  arrowInner: {
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: "#fff",
    height: 15,
    width: 15,
    borderRadius: 3,
    transform: [{ rotate: "45deg" }],
    marginRight: 20,
    marginTop: 5,
  },

  textBtn: {
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
  },

  textTovar: {
    color: "#fff",
    padding: 8,
    fontSize: 18,
    fontWeight: "500",
    marginVertical: 1,
    paddingBottom: 9,
    paddingTop: 9,
    backgroundColor: "rgba(47, 71, 190, 0.672)",
  },

  btnScaner: {
    width: 60,
    height: 60,
    backgroundColor: "#67FE53",
    // backgroundColor: "#3DDCE7",
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    zIndex: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },

  imgQR: {
    width: "80%",
    height: "80%",
  },
});
