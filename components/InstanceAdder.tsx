import React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { View, Button, TextInput, TouchableHighlight } from "react-native";
import { height, width } from "../functional/Constants";

interface Props {
    handleClick: (name: string) => void;
    handleChange: (text: string) => void;
    input: string;
    submitted: boolean;
}

export const InstanceAdder = (props: Props) => {
    const ref = useRef<TextInput>(null);
    useEffect(() => {
        if (props.submitted) {
            if (ref.current !== null) {
                ref.current.clear();
            }
        }
    }, [props.submitted]);

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <TextInput
                ref={ref}
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
