import React from "react";
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
} from "react-native";
import InputBox from "./components/InputBox";
import Output from "./components/Output";
import Btn from "./components/Btn";
import FormCheckBox from "./components/FormCheckBox";
import { DEFAULT_PASSWORD_REQ } from "./utility/Consts";
import { useState } from "react";
import { generatePasswordString } from "./utility/passwordGenerator";
import * as utils from "./utility/Consts";
import * as Clipboard from 'expo-clipboard';
import { Snackbar } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

function Main() : React.JSX.Element {

    const [upperChecked, setUpperChecked] = useState(DEFAULT_PASSWORD_REQ.upper)
    const [lowerChecked, setLowerChecked] = useState(DEFAULT_PASSWORD_REQ.lower)
    const [specialChecked, setSpecialChecked] = useState(DEFAULT_PASSWORD_REQ.symbol)
    const [numbersChecked, setNumbersChecked] = useState(DEFAULT_PASSWORD_REQ.number)
    const [length, setLength] = useState(DEFAULT_PASSWORD_REQ.length)
    const [password, setPassword] = useState("")

    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [snackBarMessage, setSnackbarMessage] = useState("");

    const handleCopy = async (textToCopy: string) => {
        await Clipboard.setStringAsync(textToCopy);
        setSnackbarMessage("Password Successfully Copied!");
        setSnackbarVisible(true);
    }

    const passwordReq: utils.PasswordRequirement = {
        length: parseInt(length),
        includeUpper: upperChecked,
        includeLower: lowerChecked,
        includeSymbol: specialChecked,
        includeNumber: numbersChecked,
    }

    function handleGeneratePressed()
    {
        if (parseInt(length) >= 8 && parseInt(length) <= 16)
        {
            const generatedPassword = generatePasswordString(passwordReq);
            setPassword(generatedPassword);
            console.log(generatedPassword);
        }
        else
        {
            setSnackbarMessage("Invalid Length");
            setSnackbarVisible(true);
        }
    }

    function reset()
    {
        setPassword("");
        setLength("");
        setUpperChecked(false);
        setLowerChecked(false);
        setSpecialChecked(false);
        setNumbersChecked(false);
        setSnackbarMessage("Password Generator Reset!");
        setSnackbarVisible(true);
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView>
                <View>
                    <View style={styles.TextView}>
                        <Text style={styles.Text}>Password Generator</Text>
                    </View>
                    <InputBox onChange={setLength} value={length}/>
                    <FormCheckBox id={1} label="Upper Case Letter" checkboxColor="#46aef0" checked={upperChecked} setChecked={setUpperChecked}/>
                    <FormCheckBox id={2} label="Lower Case Letter" checkboxColor="#036e03" checked={lowerChecked} setChecked={setLowerChecked}/>
                    <FormCheckBox id={3} label="Special Character" checkboxColor="#ff801f" checked={specialChecked} setChecked={setSpecialChecked}/>
                    <FormCheckBox id={4} label="Numbers" checkboxColor="#cb1fff" checked={numbersChecked} setChecked={setNumbersChecked}/>
                    <Output generatedPassword={password} placeholder="Select Options..." handleCopy={handleCopy}/> 
                    <Btn type={1} title="Generate Password" onPress={handleGeneratePressed}/> 
                    <Btn type={2} title="Reset" onPress={reset}/> 
                    <Snackbar
                        visible={snackbarVisible}
                        onDismiss={() => setSnackbarVisible(false)}
                        duration={3000}
                    >
                    {snackBarMessage}
                    </Snackbar>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    TextView: {
        alignItems: 'center',
        marginBottom: 20,
    },
    Text: {
        fontSize: 30,
        fontWeight: 'bold',
        fontFamily: '',
    }
})
    

export default Main;