import React from "react";
import { useState } from "react";
import { View, Button, TextInput, TouchableHighlight } from "react-native";

interface Props {
    clicker: (name: string) => void;
    handler: (text: string) => void;
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
                    height: 40,
                    width: 180,
                    padding: 10,
                    marginBottom: 30,
                    borderRadius: 10,
                    textAlign: "center",
                }}
                placeholder="Enter Name"
                placeholderTextColor="white"
                onChangeText={(text) => props.handler(text)}
                maxLength={15}
            />
            <TouchableHighlight
                style={{
                    borderRadius: 5,
                    overflow: "hidden",
                    borderWidth: 1,
                    borderStyle: "solid",
                    borderColor: "#BB86FC",
                }}
            >
                <Button
                    color="#2f2f2f"
                    title="Create"
                    onPress={() => props.clicker(props.input)}
                />
            </TouchableHighlight>
        </View>
    );
};
