import React, { useEffect, useState, Component } from "react";
import { View, Text as RNText, Animated } from "react-native";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { G, Path, Svg, TSpan, Text } from "react-native-svg";
import * as d3Shape from "d3-shape";
import color from "randomcolor";
import { snap } from "@popmotion/popcorn";

interface Props extends React.ClassAttributes<any> {
    numberOfSegments: number;
    data: string[];
    updater: (value: string) => void;
}

interface PassedProps extends React.ClassAttributes<any> {
    numberOfSegments: number;
    data: string[];
    updater: (value: string) => void;
}

export class Wheel extends Component<Props & PassedProps, any> {
    constructor(props: any) {
        super(props);
    }

    width = 310;
    wheelSize = this.width * 1;
    fontSize = 15;
    oneTurn = 360;
    angleBySegment = this.oneTurn / this.props.numberOfSegments;
    angleOffset = this.angleBySegment / 2;

    makeWheel = () => {
        const data: any = Array.from({
            length: this.props.numberOfSegments,
        }).fill(1);
        const arcs = d3Shape.pie()(data);
        const colors = color({
            hue: "#BB86FC",
            count: this.props.numberOfSegments,
        });

        return arcs.map((arc: any, index) => {
            const instance = d3Shape
                .arc()
                .padAngle(0.01)
                .outerRadius(this.width / 2)
                .innerRadius(15);

            return {
                path: instance(arc),
                color: colors[index],
                value: this.props.data[index], //Math.round(Math.random() * 10 + 1) * 200,
                centroid: instance.centroid(arc),
            };
        });
    };

    _wheelPaths = this.makeWheel();
    _angle = new Animated.Value(0);
    angle = 0;

    state = {
        enabled: true,
        winner: "",
        finished: false,
    };

    componentDidMount() {
        this._angle.addListener((event) => {
            if (this.state.enabled) {
                this.setState({
                    enabled: false,
                    finished: false,
                });
            }
            this.angle = event.value;
        });
    }

    _renderSvgWheel = () => {
        return (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Animated.View
                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        transform: [
                            {
                                rotate: this._angle.interpolate({
                                    inputRange: [
                                        -this.oneTurn,
                                        0,
                                        this.oneTurn,
                                    ],
                                    outputRange: [
                                        `-${this.oneTurn}deg`,
                                        `0deg`,
                                        `${this.oneTurn}deg`,
                                    ],
                                }),
                            },
                        ],
                    }}
                >
                    <Svg
                        width={this.wheelSize}
                        height={this.wheelSize}
                        viewBox={`0 0 ${this.width} ${this.width}`}
                        style={{
                            transform: [{ rotate: `-${this.angleOffset}deg` }],
                        }}
                    >
                        <G y={this.width / 2} x={this.width / 2}>
                            {this._wheelPaths.map((arc, i) => {
                                const [x, y] = arc.centroid;
                                const number = arc.value.toString();

                                return (
                                    <G key={`arc-${i}`}>
                                        {/* @ts-ignore */}
                                        <Path d={arc.path} fill={arc.color} />
                                        <G
                                            rotation={
                                                (i * this.oneTurn) /
                                                    this.props
                                                        .numberOfSegments +
                                                this.angleOffset
                                            }
                                            originX={x}
                                            originY={y}
                                        >
                                            <Text
                                                x={x}
                                                y={y - 60}
                                                fill="white"
                                                fontSize={this.fontSize}
                                                textAnchor="middle"
                                            >
                                                {Array.from({
                                                    length: number.length,
                                                }).map((_, j) => {
                                                    return (
                                                        <TSpan
                                                            x={x}
                                                            dy={this.fontSize}
                                                            key={`arc-${i}-slice-${j}`}
                                                        >
                                                            {number.charAt(j)}
                                                        </TSpan>
                                                    );
                                                })}
                                            </Text>
                                        </G>
                                    </G>
                                );
                            })}
                        </G>
                    </Svg>
                </Animated.View>
            </View>
        );
    };

    _getWinnerIndex = () => {
        const deg = Math.abs(Math.round(this.angle % this.oneTurn));
        return Math.floor(deg / this.angleBySegment);
    };

    _winnerUpdater = () => {
        console.log("wheelWinner: ", this.state.winner);
        this.props.updater(this.state.winner);
    };

    _onPan = ({ nativeEvent }: any) => {
        if (nativeEvent.state === State.END) {
            const { velocityY } = nativeEvent;
            Animated.decay(this._angle, {
                velocity: velocityY / 1000,
                deceleration: 0.999,
                useNativeDriver: true,
            }).start(() => {
                this._angle.setValue(this.angle % this.oneTurn);
                const snapTo = snap(this.oneTurn / this.props.numberOfSegments);
                Animated.timing(this._angle, {
                    toValue: snapTo(this.angle),
                    duration: 300,
                    useNativeDriver: true,
                }).start(() => {
                    const winnerIndex = this._getWinnerIndex();
                    this.setState({
                        enabled: true,
                        winner: this._wheelPaths[winnerIndex].value,
                        finished: true,
                    });
                    this._winnerUpdater();
                });
            });
        }
    };

    /* _renderWinner = () => {
        return <RNText>Winner: {this.state.winner}</RNText>;
    }; */

    render() {
        return (
            <PanGestureHandler
                onHandlerStateChange={this._onPan}
                enabled={this.state.enabled}
            >
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    {this._renderSvgWheel()}
                    {/* {this.state.finished &&
                        this.state.enabled &&
                        this._renderWinner()} */}
                </View>
            </PanGestureHandler>
        );
    }
}
