import React from "react";
import { useState } from "react";
import {
    View,
    Button,
    TextInput,
    TouchableHighlight,
    Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");

interface Props {
    handleClick: (name: string) => void;
    handleChange: (text: string) => void;
    input: string;
}

export const InstanceAdder = (props: Props) => {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <TextInput
                style={{
                    color: "white",
                    borderStyle: "solid",
                    borderColor: "white",
                    borderWidth: 1,
                    height: height / 18,
                    width: width / 2,
                    marginBottom: height / 25,
                    borderRadius: width / 30,
                    textAlign: "center",
                }}
                placeholder="Enter Name"
                placeholderTextColor="white"
                onChangeText={(text) => props.handleChange(text)}
                maxLength={10}
            />
            <TouchableHighlight
                style={{
                    borderRadius: width / 50,
                    overflow: "hidden",
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: "#BB86FC",
                }}
            >
                <Button
                    color="#2f2f2f"
                    title="Create"
                    onPress={() => props.handleClick(props.input)}
                />
            </TouchableHighlight>
        </View>
    );
};
