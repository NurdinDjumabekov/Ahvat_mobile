import { useEffect } from "react";
import { Dimensions, RefreshControl, SafeAreaView, View } from "react-native";
import { ScrollView, StyleSheet, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Table, Row, Rows, TableWrapper } from "react-native-table-component";

///// helpers
import { listTableLeftoverst } from "../helpers/Data";
import { getLocalDataUser } from "../helpers/returnDataUser";
import { transformListForSelect } from "../helpers/transformListForSelect";

//// redux
import { changeLocalData } from "../store/reducers/saveDataSlice";
import { categoryGuidFN, doctorGuidFN } from "../store/reducers/stateSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  changeLeftovers,
  clearListCategory,
  getCategDoctor,
  getListAgents,
  getMyLeftovers,
} from "../store/reducers/requestSlice";

export const LeftoversScreen = () => {
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.saveDataSlice);

  const { doctorGuid, categoryGuid } = useSelector((state) => state.stateSlice);

  const { preloader, listLeftovers, listCategory, listAgents } = useSelector(
    (state) => state.requestSlice
  );

  // console.log(listLeftovers, "listLeftovers");

  useEffect(() => {
    getData();
    return () => {
      ///// очищаю все данные на выходе с этой стр
      dispatch(changeLeftovers([]));
      dispatch(clearListCategory());
      dispatch(doctorGuidFN({}));
      dispatch(categoryGuidFN({}));
    };
  }, []);

  const seller_guid = data?.seller_guid;

  const getData = async () => {
    await getLocalDataUser({ changeLocalData, dispatch });
    await dispatch(getListAgents({ seller_guid, check: true }));
  };

  const onChangeDoctor = (value) => {
    dispatch(doctorGuidFN(value));
    dispatch(getCategDoctor({ guid: value, seller_guid }));
  };

  const onChangeCateg = (value) => {
    const objData = { doctor_guid: doctorGuid, initilalCateg: value };
    dispatch(getMyLeftovers(objData));
  };

  const windowWidth = Dimensions.get("window").width;
  const arrWidth = [45, 19, 18, 18]; //  проценты %

  const resultWidths = arrWidth.map(
    (percentage) => (percentage / 100) * windowWidth
  );

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY <= 0) {
      // Если скролл достиг верхней границы
      getData();
    }
  };

  const nonDate = listCategory?.length === 0;

  const listCategoryNew = nonDate
    ? [{ label: "", value: "" }] /// селект не может быть пустым, поэтому добалвяю пустые полня если нет данных
    : listCategory?.slice(1, 250); /// убираю категрию "Все"

  return (
    <ScrollView
      style={styles.container}
      onScroll={handleScroll}
      scrollEventThrottle={400}
      refreshControl={
        <RefreshControl refreshing={preloader} onRefresh={getData} />
      }
    >
      <SafeAreaView>
        <View>
          <Text style={styles.choiceCateg}>Выберите доктора *</Text>
          <View style={styles.blockSelect}>
            <RNPickerSelect
              onValueChange={onChangeDoctor}
              items={transformListForSelect(listAgents)}
              value={doctorGuid || {}}
              placeholder={{}}
            />
          </View>
        </View>
        <Table borderStyle={styles.styleHeadTable}>
          <Row
            data={listTableLeftoverst}
            style={styles.head}
            textStyle={{ margin: 3, fontSize: 14, fontWeight: "500" }}
            flexArr={resultWidths}
          />
          <TableWrapper style={{ flexDirection: "row" }}>
            <Rows
              data={listLeftovers.map((item) => [
                item[0], // Товар
                item[1], // Цена
                item[2], // Кол-во
                <Text style={{ ...styles.textStyles, color: "green" }}>
                  {item[3]}
                </Text>, // Бонусы
              ])}
              textStyle={styles.textStyles}
              flexArr={resultWidths}
            />
          </TableWrapper>
        </Table>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 1,
    paddingRight: 1,
    paddingTop: 10,
    paddingBottom: 100,
    marginBottom: 20,
  },

  choiceCateg: {
    fontSize: 16,
    width: "96%",
    alignSelf: "center",
    paddingVertical: 8,
    fontWeight: "600",
    paddingTop: 0,
  },

  blockSelect: {
    backgroundColor: "#fff",
    width: "97%",
    alignSelf: "center",
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.9,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 12,
  },

  textStyles: {
    margin: 7,
    marginBottom: 8,
    marginTop: 8,
    fontSize: 13,
  },

  sortBlock: {
    display: "flex",
    flexDirection: "row",
  },

  head: {
    height: 65,
    backgroundColor: "rgba(199, 210, 254, 0.250)",
  },
  noneData: {
    flex: 1,
    height: 500,
    paddingTop: 250,
    textAlign: "center",
    fontSize: 20,
  },

  styleHeadTable: {
    borderWidth: 1,
    borderColor: "rgba(199, 210, 254, 0.718)",
    minWidth: "100%",
    textAlign: "center",
  },
});
