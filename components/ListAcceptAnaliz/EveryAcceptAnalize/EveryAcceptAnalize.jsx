//// tags
import { Text, TouchableOpacity, View } from "react-native";

///// style
import styles from "./style";

export const EveryAcceptAnalize = ({ obj, index }) => {
  //// кажждый принятый анализ

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.innerBlock}>
        <View style={styles.mainData}>
          <Text style={styles.titleNum}>{index + 1}</Text>
          <View>
            <Text
              style={[styles.titleDate, styles.role]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {obj?.doctor || "..."}
            </Text>
            <Text style={styles.titleDate}>{obj.date}</Text>
          </View>
        </View>
        <View style={styles.listAnalizzz}>
          {obj?.analyze_type?.map((item, index) => (
            <Text style={styles.comments} key={item?.guid}>
              {index > 0 ? `, ${item?.name_analiz}` : item?.name_analiz}
            </Text>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
};
