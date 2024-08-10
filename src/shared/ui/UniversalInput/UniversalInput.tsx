import React from "react";
import { TextInput, StyleSheet, ViewStyle, TextStyle, TextInputProps, View } from "react-native";

interface InputProps extends TextInputProps {
  style?: ViewStyle;
  inputStyle?: TextStyle;
}

const UniversalInput: React.FC<InputProps> = ({ style, inputStyle, ...rest }) => {
	return (
		<View style={style}>
			<TextInput style={[styles.input, inputStyle]} {...rest} />
		</View>
	);
};

const styles = StyleSheet.create({
	input: {
		height: 40,
		borderColor: "#CCCCCC",
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: 10,
	},
});

export default UniversalInput;