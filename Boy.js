import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import Girl from './Girl'
import NavigationBar from './js/common/NavigationBar'

export default class Boy extends Component {
    constructor(props) {
        super(props);
        this.state={
            what:''
        }
    }
    render(){
        let what=this.state.what===''?'':'我收到了女孩回赠的:'+this.state.what;
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={'Boy'}
                    style={{
                        backgroundColor:'#EE6353'
                    }}
                    />

                <Text style={styles.text}>I am boy</Text>
                <Text style={styles.text}
                      onPress={()=>{
                            this.props.navigator.push({
                                component:Girl,
                                name:Girl,
                                params:{
                                    what:'一支玫瑰',
                                    onCallBack:(what)=>{
                                        this.setState({
                                            what:what
                                        })
                                    }
                                }
                            })
                      }}>送女孩一支玫瑰</Text>
                <Text style={styles.text}>{what}</Text>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:'gray',
        // justifyContent: 'center'
    },
    text:{
        fontSize:20,
    }
})