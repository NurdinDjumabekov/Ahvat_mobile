import { useEffect } from "react";
import { RefreshControl, StyleSheet, View, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getListAcceptInvoice } from "../../store/reducers/requestSlice";
import { EveryAcceptAnalize } from "../../components/ListAcceptAnaliz/EveryAcceptAnalize/EveryAcceptAnalize";
import { Text } from "react-native";

export const ListAcceptAnalizScreen = () => {
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.saveDataSlice);

  const { preloader, listAcceptAnaliz } = useSelector(
    (state) => state.requestSlice
  );

  const getData = () => dispatch(getListAcceptInvoice(data));

  useEffect(() => {
    getData();
  }, []);

  const none = listAcceptAnaliz?.length === 0;

  return (
    <View style={styles.container}>
      {none ? (
        <Text style={styles.noneData}>Список пустой</Text>
      ) : (
        <FlatList
          contentContainerStyle={styles.flatListStyle}
          data={listAcceptAnaliz}
          renderItem={({ item, index }) => (
            <EveryAcceptAnalize obj={item} index={index} />
          )}
          keyExtractor={(item, index) => `${item.guid}${index}`}
          refreshControl={
            <RefreshControl refreshing={preloader} onRefresh={getData} />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },

  flatListStyle: {
    minWidth: "100%",
    width: "100%",
    paddingBottom: 20,
  },

  noneData: {
    paddingTop: 250,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
    color: "#222",
    height: "100%",
  },
});
