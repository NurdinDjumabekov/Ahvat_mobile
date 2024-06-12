import { Alert, StyleSheet, Text, View } from "react-native";
import React from "react";
import RNPickerSelect from "react-native-picker-select";
import { getLocalDataUser } from "../helpers/returnDataUser";
import { changeLocalData } from "../store/reducers/saveDataSlice";
import { useDispatch, useSelector } from "react-redux";
import { getProductTT, searchProdTT } from "../store/reducers/requestSlice";
import {
  changeActiveSelectCategory,
  changeSearchProd,
  changeStateForCategory,
  changeTemporaryData,
} from "../store/reducers/stateSlice";

export const ActionsEveryInvoice = ({ getData, checkComponent }) => {
  const dispatch = useDispatch();
  ///delete

  const { listCategory } = useSelector((state) => state.requestSlice);

  const { activeSelectCategory } = useSelector((state) => state.stateSlice);

  const { data } = useSelector((state) => state.saveDataSlice);

  const handleValueChange = (value) => {
    if (value !== activeSelectCategory) {
      getLocalDataUser({ changeLocalData, dispatch });
      const sendData = { guid: value, seller_guid: data?.seller_guid };
      dispatch(getProductTT({ ...sendData, checkComponent }));

      dispatch(changeStateForCategory(value));
      dispatch(changeTemporaryData({}));
      ///// checkcheck

      dispatch(changeActiveSelectCategory(value));
      /// хранение активной категории, для сортировки товаров(храню guid категории)
      dispatch(changeSearchProd(""));
      ////// очищаю поиск
    }
  };

  return (
    <>
      <Text style={styles.choiceCateg}>Выберите категорию</Text>
      <View style={styles.blockSelect}>
        <RNPickerSelect
          onValueChange={handleValueChange}
          items={listCategory}
          value={activeSelectCategory}
          placeholder={{}}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  choiceCateg: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    width: "95%",
    alignSelf: "center",
    paddingBottom: 3,
    marginTop: 10,
    marginBottom: 5,
  },

  blockSelect: {
    borderWidth: 1,
    borderColor: "rgba(47, 71, 190, 0.591)",
    backgroundColor: "rgba(47, 71, 190, 0.1)",
    width: "96%",
    alignSelf: "center",
    borderRadius: 5,
    marginBottom: 10,
    height: 55,
  },
});
