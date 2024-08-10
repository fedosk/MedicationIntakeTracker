/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from "react";
import { StoreProvider } from "./src/app/providers/storeProvider";
import { NavigationProvider } from "./src/app/providers/navigationProvider/ui/NavigationProvider";
import { MainStack } from "./src/app/navigationConfig";

function App (): React.JSX.Element {
	return (
		<StoreProvider>
			<NavigationProvider>
				<MainStack/>
			</NavigationProvider>
		</StoreProvider>
	);
}

export default App;
