import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    position: "relative",
  },

  logo: {
    width: "98%",
    height: 80,
    marginBottom: 15,
  },

  listAnaliz: {
    height: "64%",
  },

  everyAnalize: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 5,
    borderBottomColor: "#5f87e6aa",
    // ///    borderColor: "#3874ff",
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    paddingVertical: 6,
  },

  checbox: {
    width: 25,
    height: 25,
    paddingRight: 2,
    borderColor: "rgba(203, 208, 221, 0.74)",
    borderWidth: 2,
    borderRadius: 3,
  },

  check: { width: "100%", height: "100%" },

  name: {
    fontSize: 18,
    color: "#43b7f2",
    fontWeight: "500",
  },

  btnAction: {
    backgroundColor: "rgba(12, 169, 70, 0.9)",
    color: "#fff",
    minWidth: "100%",
    position: "absolute",
    bottom: 50,
    alignSelf: "center",
    width: "95%",
  },
});

export default styles;
