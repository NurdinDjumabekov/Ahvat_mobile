//// tags
import { Text, TouchableOpacity, View } from "react-native";

///// style
import styles from "./style";

export const EveryAcceptAnalize = ({ obj }) => {
  //// кажждый принятый анализ

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.innerBlock}>
        <View style={styles.mainData}>
          <Text style={styles.titleNum}>{obj.codeid}</Text>
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
        <Text style={styles.comments} numberOfLines={4} ellipsizeMode="tail">
          {obj?.analyze_type || "..."}
        </Text>
      </View>
      <View style={styles.mainDataArrow}>
        <View>
          <Text style={styles.status}>Подтверждено</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
