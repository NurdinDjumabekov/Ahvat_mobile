import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    position: "relative",
  },

  logo: {
    width: "98%",
    height: 80,
    marginBottom: 15,
  },

  analyzeType: { fontSize: 18, color: "#333" },

  dateText: {
    fontSize: 18,
    color: "#43b7f2",
    fontWeight: "500",
    lineHeight: 25,
  },

  doctor: {
    fontSize: 18,
    color: "rgba(47, 71, 190, 0.891)",
    fontWeight: "500",
    marginVertical: 5,
  },

  analyzeType: {
    fontSize: 18,
    color: "rgba(12, 169, 70, 0.9)",
    fontWeight: "500",
  },

  btnAction: {
    backgroundColor: "rgba(12, 169, 70, 0.9)",
    color: "#fff",
    minWidth: "100%",
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
  },
});

export default styles;
