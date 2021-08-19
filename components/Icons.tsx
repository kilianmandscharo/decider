import React from "react";
import Svg, { Circle, Path, Rect } from "react-native-svg";
import { height } from "../functional/Constants";

const SIZE = height / 20;

export const ListIcon = () => {
    return (
        <Svg width={SIZE} height={SIZE} viewBox="0 0 100 100" fill="none">
            <Rect
                x="3"
                y="3"
                width="94"
                height="94"
                rx="7"
                stroke="white"
                strokeWidth="6"
            />
            <Rect x="23" y="35" width="54" height="4" fill="white" />
            <Rect x="23" y="22" width="54" height="4" fill="white" />
            <Rect x="23" y="74" width="54" height="4" fill="white" />
            <Rect x="23" y="61" width="54" height="4" fill="white" />
            <Rect x="23" y="48" width="54" height="4" fill="white" />
        </Svg>
    );
};

export const WheelIcon = () => {
    return (
        <Svg width={SIZE} height={SIZE} viewBox="0 0 100 100" fill="none">
            <Rect x="12" y="47" width="20" height="4" fill="white" />
            <Rect
                x="47"
                y="33"
                width="20"
                height="4"
                transform="rotate(-90 47 33)"
                fill="white"
            />
            <Rect
                x="60"
                y="35.1421"
                width="20"
                height="4"
                transform="rotate(-45 60 35.1421)"
                fill="white"
            />
            <Rect
                x="21"
                y="75.1421"
                width="20"
                height="4"
                transform="rotate(-45 21 75.1421)"
                fill="white"
            />
            <Rect
                x="35.1421"
                y="39.3848"
                width="20"
                height="4"
                transform="rotate(-135 35.1421 39.3848)"
                fill="white"
            />
            <Rect
                x="74.1421"
                y="79.3848"
                width="20"
                height="4"
                transform="rotate(-135 74.1421 79.3848)"
                fill="white"
            />
            <Rect
                x="47"
                y="87"
                width="20"
                height="4"
                transform="rotate(-90 47 87)"
                fill="white"
            />
            <Path d="M68 47H88V51H68V47Z" fill="white" />
            <Circle cx="50" cy="50" r="47" stroke="white" strokeWidth="6" />
        </Svg>
    );
};
