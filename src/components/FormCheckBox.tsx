import React from "react";
import {
    View,
    StyleSheet,
    Text,
} from "react-native";
import BouncyCheckBox from "react-native-bouncy-checkbox";

type formCheckBoxType = {
    id : number,
    label: string,
    checkboxColor : string,
    checked: boolean,
    setChecked: (status: boolean) => void,
}

function FormCheckBox(props: formCheckBoxType) : React.JSX.Element {
    const id = props.id;
    const label = props.label;
    const checkboxColor = props.checkboxColor;
    const checked = props.checked
    const setChecked = props.setChecked

    const dynamicBouncyCheckBoxStyles = {
        borderColor: checkboxColor,
        fillColor: checkboxColor,
    };

    return (
        <View style={[styles.checkBoxView]}>
            <BouncyCheckBox id={String(id)} style={[styles.bouncyCheckBoxStyles, dynamicBouncyCheckBoxStyles]} fillColor={checkboxColor} isChecked={checked} onPress={(isChecked: boolean) => {
                setChecked(isChecked);
                console.log(isChecked);
            }}/>
            <Text style={styles.textStyles}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create 
({
    checkBoxView: {
        justifyContent: 'center',
        marginTop: 20,
        flexDirection: 'row',
    },
    bouncyCheckBoxStyles: {
        marginRight: 20,
        borderWidth: 10,
        width: 45,
        borderRadius: 50,
    },
    textStyles: {
        fontSize: 30,
        color: '#808080',
        fontWeight: '900',
        marginTop: 5,
    }
})
    

export default FormCheckBox;