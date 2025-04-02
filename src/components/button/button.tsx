import { ButtonProps, Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";

export function Button({ title, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7} {...rest}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}