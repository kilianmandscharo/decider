import React from "react";
import { Button, View, Text, TouchableHighlight } from "react-native";

interface Props {
    name: string;
    deleteName: (name: string) => void;
}

export const Instance = (props: Props) => {
    return (
        <View
            style={{
                flex: 2,
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 10,
                height: 50,
                alignItems: "center",
            }}
        >
            <Text style={{ color: "white", fontSize: 22 }}>{props.name}</Text>
            <TouchableHighlight
                style={{
                    width: 30,
                    borderRadius: 5,
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
