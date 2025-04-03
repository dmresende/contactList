import { MaterialIcons } from "@expo/vector-icons";
import { Text, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { Colors } from "@/src/constants/Colors";


type OptionButtonProps = {
  name: string;
  //INFOR: tpo apropriado para icones usados no material icon, nese caso ele poderia retornar algo diferente de uma string por isso deve ser o tipo apropriado 
  icon: keyof typeof MaterialIcons.glyphMap;
  variant: "primary" | "secondary";
  onPress?: () => void;
};


export const OptionButton = ({ name, icon, variant = 'primary', ...rest }: OptionButtonProps) => {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <MaterialIcons
        name={icon}
        size={24}
        color={variant === 'primary' ? Colors.lightOlli["gray-100"] : Colors.lightOlli["gray-100"]}
      />
      <Text
        style={variant === 'primary' ? styles.primatyTitle : styles.secondaryTitle}
      >
        {name}
      </Text>
    </TouchableOpacity>
  );
}
