import React from "react";
import  { ReactNode } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

interface GestureHandlerProviderProps {
    children?: ReactNode;
}

export const GestureHandlerProvider = (props: GestureHandlerProviderProps) => {
	const {children} = props;

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			{children}
		</GestureHandlerRootView>
	);
};