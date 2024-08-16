/////// tags
import { TouchableOpacity, RefreshControl } from "react-native";
import { View, Text, Image, FlatList } from "react-native";
import { ViewButton } from "../../customsTags/ViewButton";

/////// hooks
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

/////// style
import styles from "./style";

/////// components
import ConfirmationModal from "../../common/ConfirmationModal";

/////// fns
import { changeChoiceAnalize } from "../../store/reducers/requestSlice";
import { getAllAnaliz } from "../../store/reducers/requestSlice";
import { confirmInvoiceQRResult } from "../../store/reducers/requestSlice";

/////// imgs
import check from "../../assets/icons/check.png";
import logo from "../../assets/images/ahvatLogo.png";

const ConfirmAnalizScreen = ({ navigation, route }) => {
  const { analyze_type, date, fio, qrcode } = route.params?.data;

  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.saveDataSlice);
  const { preloader, listAnaliz } = useSelector((state) => state.requestSlice);
  const [confirm, setConfirm] = useState(false); // Состояние для идентификатора элемента, для которого открывается модальное окно

  const confirmBtn = () => {
    const analyze_type = listAnaliz
      ?.filter((item) => item?.bool === true)
      ?.map((item) => item?.guid);

    const dataObj = { qrcode, seller_guid: data?.seller_guid, analyze_type };
    dispatch(confirmInvoiceQRResult({ dataObj, navigation }));
  };

  const getData = () => {
    dispatch(getAllAnaliz(data?.seller_guid));
  };

  useEffect(() => {
    getData();

    navigation.setOptions({ title: fio });
  }, [fio]);

  const onChange = (obj) => dispatch(changeChoiceAnalize(obj));
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <View style={styles.listAnaliz}>
        <FlatList
          data={listAnaliz}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.everyAnalize}
              onPress={() => onChange(item)}
            >
              <View style={styles.checbox}>
                {item?.bool && <Image style={styles.check} source={check} />}
              </View>
              <Text style={styles.name}>{item?.name_analiz}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item?.guid}
          refreshControl={
            <RefreshControl refreshing={preloader} onRefresh={getData} />
          }
        />
      </View>
      <ViewButton onclick={() => setConfirm(true)} styles={styles.btnAction}>
        Подтвердить
      </ViewButton>
      <ConfirmationModal
        visible={confirm}
        message="Подтвердить ?"
        onYes={confirmBtn}
        onNo={() => setConfirm(false)}
        onClose={() => setConfirm(false)}
      />
    </View>
  );
};

export default ConfirmAnalizScreen;
