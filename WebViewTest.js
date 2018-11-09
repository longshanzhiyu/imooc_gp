import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    WebView,
    TextInput,
    DeviceEventEmitter,
} from 'react-native';
import NavigationBar from './js/common/NavigationBar'

const URL='https://www.imooc.com'
// const URL='https://www.baidu.com'

export default class WebViewTest extends Component {
    constructor(props) {
        super(props);
        this.state={
            url:URL,
            title:'WebView的使用',
            canGoBack:false,
        }
    }

    go(){
        this.setState({
            url:this.text,
        })
        // console.log(this.state.text);
        // console.log(this.text);
    }

    goBack(){
        if (this.state.canGoBack){
            this.webView.goBack();
        } else {
            DeviceEventEmitter.emit('showToast', '到顶了');
        }
    }

    onNavigationStateChange(e){
        this.setState({
            canGoBack:e.canGoBack,
            title:e.title,
        })
    }

    render(){
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={this.state.title}
                    style={{
                        backgroundColor:'#EE6353'
                    }}
                    />
                <View style={styles.row}>
                    <Text style={styles.tips}
                        onPress={()=>{
                            this.goBack();
                        }}
                    >返回</Text>
                    <TextInput
                        style={styles.input}
                        defaultValue={URL}
                        onChangeText={text=>this.text=text}
                    />
                    <Text style={styles.tips}
                          onPress={()=>{
                              this.go();
                          }}
                    >前往</Text>
                </View>
                <WebView
                    ref={webView=>this.webView=webView}
                    source={{uri:this.state.url}}
                    onNavigationStateChange={(e)=>this.onNavigationStateChange(e)}
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
    row:{
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    input:{
        height:40,
        flex: 1,
        borderWidth: 1,
        margin: 2,
    },
    tips:{
        fontSize: 20,
    }
})