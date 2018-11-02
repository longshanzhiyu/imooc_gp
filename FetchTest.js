import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import NavigationBar from './NavigationBar';

export default class FetchTest extends Component {

    constructor(props) {
        super(props);
        this.state = {
            result:''
        }
    }

    onLoad(url){
        fetch(url)
            .then(response=>response.json())
            .then(result=>{
                    this.setState({
                        result:JSON.stringify(result)
                    })
                })
            .catch(error=>{
                this.setState({
                    result:JSON.stringify(error)
                })
            })
    }

    onSubmit(url, data) {
        fetch(url, {
            method:'POST',
            header:{
                'Accept':'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(data)
        })
            .then(response=>response.json())
            .then(result=>{
                this.setState({
                    result:JSON.stringify(result)
                })
            })
            .catch(error=>{
                this.setState({
                    result:JSON.stringify(error)
                })
            })
    }

    render(){
        return (
            <View style={styles.container}>
                <NavigationBar
                title={'Fetch的使用'}
                />
                <Text style={styles.tips}
                    onPress={()=>this.onLoad('http://192.168.3.126:3000/mock/11/abc')}
                >获取数据</Text>
                <Text style={styles.tips}
                      onPress={()=>this.onSubmit('http://192.168.3.126:3000/mock/11/submit', {username:'小明', password:'123456'})}
                >提交数据</Text>
                <Text>返回结果:{this.state.result}</Text>
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