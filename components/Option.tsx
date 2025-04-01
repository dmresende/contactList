import { colors } from "@/styles/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type OptionProps = {
    name: string;
    icon: keyof typeof MaterialIcons.glyphMap; //tpo apropriado para icones usados no material icon, nese caso ele poderia retornar algo diferente de uma string por isso deve ser o tipo apropriado 
    variant: "primary" | "secondary";
    onPress?: () => void;
};


export const Option = ({ name, icon, variant = 'primary', ...rest }: OptionProps) => {
    return (
        <TouchableOpacity style={styles.container} {...rest}>
            <MaterialIcons
                name={icon}
                size={24}
                color={variant === 'primary' ? colors.green[300] : colors.gray[400]}
            />
            <Text
                style={variant === 'primary' ? styles.primatyTitle : styles.secondaryTitle}
            >
                {name}
            </Text>
        </TouchableOpacity>
    );
}

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    primatyTitle: {
        color: colors.green[300],
        fontSize: 16,
        fontWeight: "600",
    },
    secondaryTitle: {
        color: colors.green[300],
        fontSize: 16,
    },
});