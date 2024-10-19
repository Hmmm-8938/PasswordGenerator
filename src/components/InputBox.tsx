import React from "react";
import {
    View,
    TextInput,
    StyleSheet,
} from "react-native";
import { useState } from "react";

type InputBoxProps = {
    onChange: (value: string) => void;
    value: string;
}

function InputBox({ onChange, value }: InputBoxProps) : React.JSX.Element {
    
    const handleChange = (text) => {
        // This will allow the text input to only accept numbers
        const numericValue = text.replace(/[^0-9]/g, '');
        onChange(numericValue);
    }

    return (
        <View style={styles.textInputView}>
            <TextInput 
                style={styles.textInput} 
                placeholder="Password Length (8-16)" 
                maxLength={2} 
                keyboardType="numeric"
                value={value}
                onChangeText={handleChange}
            />
        </View>
    );
}



const styles = StyleSheet.create 
({
    textInput: {
        borderWidth: 7,
        borderColor: '#000',
        width: '80%',
        borderRadius: 105,
        height: 60,
        fontSize: 25,
        textAlign: 'center',
    },

    textInputView: {
        justifyContent: 'center',
        alignItems: 'center',
    }
})
    

export default InputBox;