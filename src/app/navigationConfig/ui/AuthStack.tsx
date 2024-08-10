import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Auth } from "../../../screens/Auth";

const AuthStack = () => {
	const Stack = createNativeStackNavigator();

	return (
		<Stack.Navigator>
			<Stack.Screen name="Auth" component={Auth} />
		</Stack.Navigator>
	);
};

export default AuthStack;