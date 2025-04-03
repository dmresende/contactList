import { Colors } from "@/src/constants/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: Colors.lightOlli["indigo-600"],
    justifyContent: "center",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    width: "40%"
  },
  primatyTitle: {
    color: Colors.lightOlli["neutral-primary"],
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryTitle: {
    color: Colors.lightOlli["neutral-primary"],
    fontSize: 16,
  },
});