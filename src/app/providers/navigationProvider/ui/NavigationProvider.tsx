import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import  { ReactNode } from "react";

interface NavigationProviderProps {
    children?: ReactNode;
}

export const NavigationProvider = (props: NavigationProviderProps) => {
	const {children} = props;

	return (
		<NavigationContainer>
			{children}
		</NavigationContainer>
	);
};