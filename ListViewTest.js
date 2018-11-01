import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import NavigationBar from './NavigationBar';

export default class ListViewTest extends Component {

    render(){
        return (
            <View style={styles.container}>
                <NavigationBar
                title={'ListViewTest'}
                />
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'white',
        // justifyContent: 'center'
    },
    text:{
        fontSize:20,
    }
})