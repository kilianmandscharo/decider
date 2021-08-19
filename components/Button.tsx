import React from "react";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { height, purple, width } from "../functional/Constants";

const styles = StyleSheet.create({
    button: {
        marginTop: height / 50,
        borderRadius: width / 30,
        borderWidth: 1,
        borderColor: purple,
        padding: width / 100,
    },
    buttonText: {
        textAlign: "center",
        color: "white",
        fontSize: width / 20,
    },
});

interface ButtonProps {
    handlePress: any;
    text: string;
    color: string;
}

const StandardButton = ({ handlePress, text, color }: ButtonProps) => {
    return (
        <TouchableOpacity
            onPress={handlePress}
            style={[styles.button, { backgroundColor: color }]}
            activeOpacity={0.7}
        >
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
};

export default StandardButton;
