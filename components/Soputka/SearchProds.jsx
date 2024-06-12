import React, { useCallback, useRef } from "react";
import { StyleSheet, Image, View, Text } from "react-native";
import { TextInput, TouchableOpacity } from "react-native";
import { changeSearchProd } from "../../store/reducers/stateSlice";
import {
  clearListProductTT,
  searchProdTT,
} from "../../store/reducers/requestSlice";
import { useDispatch, useSelector } from "react-redux";
import searchIcon from "../../assets/icons/searchIcon.png";
import { debounce } from "lodash";

export const SearchProds = ({ disable, navigation, guid, refInput }) => {
  const dispatch = useDispatch();

  const { searchProd } = useSelector((state) => state.stateSlice);

  const searchData = useCallback(
    debounce((text) => {
      if (text?.length > 1) {
        dispatch(searchProdTT(text)); // Выполнение поиска с заданными параметрами
      }
    }, 800),
    []
  );

  const onChange = (text) => {
    dispatch(changeSearchProd(text));
    searchData(text);
    if (text === "") {
      dispatch(clearListProductTT());
    }
  };

  const clickSearch = () => {
    if (disable) {
      navigation.navigate("SearchScreen", { guid });
    }
  };

  if (disable) {
    return (
      <TouchableOpacity style={styles.blockSearch} onPress={clickSearch}>
        <Text style={styles.textSearch}>Поиск...</Text>
        <TouchableOpacity onPress={clickSearch}>
          <Image style={styles.iconSearch} source={searchIcon} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.blockSearch}>
      <TextInput
        ref={refInput}
        style={styles.inputSearch}
        placeholderTextColor={"#222"}
        placeholder="Поиск..."
        onChangeText={onChange}
        value={searchProd}
      />
      <TouchableOpacity onPress={() => refInput?.current?.focus()}>
        <Image style={styles.iconSearch} source={searchIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  textSearch: {
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    fontSize: 17,
    fontWeight: "400",
    color: "#000",
    width: "100%",
  },

  ///////////////////////////////
  blockSearch: {
    height: 50,
    width: "85%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  inputSearch: {
    height: 35,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    fontSize: 16,
    fontWeight: "400",
    color: "#000",
    width: "100%",
  },
  iconSearch: {
    width: 22,
    height: 22,
  },
});
