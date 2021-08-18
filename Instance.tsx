import React from "react";
import {
    Button,
    View,
    Text,
    TouchableHighlight,
    Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

interface Props {
    name: string;
    deleteName: (name: string) => void;
}

export const Instance = (props: Props) => {
    return (
        <View
            style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: height / 50,
                height: height / 15,
                alignItems: "center",
            }}
        >
            <Text style={{ color: "white", fontSize: width / 18 }}>
                {props.name}
            </Text>
            <TouchableHighlight
                style={{
                    width: width / 14,
                    borderRadius: width / 50,
                    overflow: "hidden",
                }}
            >
                <Button
                    title="X"
                    color="#BB86FC"
                    onPress={() => props.deleteName(props.name)}
                />
            </TouchableHighlight>
        </View>
    );
};
