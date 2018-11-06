
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
} from 'react-native';
import NavigationBar from '../common/NavigationBar';

export default class PopularPage extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return <View>
            <NavigationBar
                title={'最热'}
                style={{backgroundColor:'#6495ED'}}
            />
            <Text>获取数据</Text>
            <TextInput style={{height:20}}/>
        </View>
    }
}