import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { clearListProductTT } from "../store/reducers/requestSlice";
import {
  changeSearchProd,
  changeTemporaryData,
} from "../store/reducers/stateSlice";
import { SearchProds } from "../components/Soputka/SearchProds";
import { AddProducts } from "../components/Soputka/AddProducts";

export const SearchScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { guid } = route.params; ////guid созданной накладной

  const { listProductTT } = useSelector((state) => state.requestSlice);

  console.log(listProductTT, "listProductTT");
  const refInput = useRef(null);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <SearchProds
          disable={false}
          navigation={navigation}
          guid={guid}
          refInput={refInput}
        />
      ),
    });

    setTimeout(() => {
      refInput?.current?.focus();
    }, 300);

    return () => {
      dispatch(clearListProductTT());
      dispatch(changeSearchProd(""));
    };
    //// очищаю список категорий и товаров
  }, []);

  const clickProd = (obj) => {
    dispatch(changeTemporaryData({ ...obj, ves: "1" }));
  };

  return (
    <>
      <ScrollView style={styles.parentBlock}>
        {listProductTT?.map((item, index) => (
          <TouchableOpacity
            style={styles.container}
            onPress={() => clickProd(item)}
          >
            <Text style={styles.name} numberOfLines={2} ellipsizeMode="tail">
              {index + 1}. {item?.product_name}
            </Text>
            <View style={styles.arrow}></View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <AddProducts guid={guid} />
      {/* ///// модалка для добавления товаров */}
    </>
  );
};

const styles = StyleSheet.create({
  parentBlock: {
    flex: 1,
    backgroundColor: "#fff",
    position: "relative",
    paddingVertical: 10,
  },

  container: {
    paddingHorizontal: 10,
    paddingVertical: 18,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 8,
    fontSize: 18,
    fontWeight: "500",
    marginVertical: 1,
    backgroundColor: "rgba(47, 71, 190, 0.672)",
  },

  arrow: {
    borderTopWidth: 3,
    borderRightWidth: 3,
    borderColor: "#fff",
    height: 15,
    width: 15,
    borderRadius: 3,
    transform: [{ rotate: "45deg" }],
    marginRight: 20,
  },

  name: {
    fontSize: 18,
    fontWeight: "400",
    lineHeight: 18,
    maxWidth: "82%",
    color: "#fff",
  },
});
