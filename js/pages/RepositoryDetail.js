import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    WebView,
    TextInput,
    DeviceEventEmitter,
} from 'react-native';
import NavigationBar from '../../js/common/NavigationBar';
import ViewUtils from '../util/ViewUtils';

const URL='https://www.imooc.com'
// const URL='https://www.baidu.com'

export default class RepositoryDetail extends Component {
    constructor(props) {
        super(props);
        this.url=this.props.item.html_url;
        let title=this.props.item.full_name;
        this.state={
            url:this.url,
            title:title,
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

    onBack(){
        if (this.state.canGoBack){
            this.webView.goBack();
        } else {
            DeviceEventEmitter.emit('showToast', '到顶了');
            this.props.navigator.pop();
        }
    }

    onNavigationStateChange(e){
        this.setState({
            canGoBack:e.canGoBack,
        })
    }

    render(){
        return (
            <View style={styles.container}>
                <NavigationBar
                    title={this.state.title}
                    style={{
                        backgroundColor:'#6495ED'
                    }}
                    leftButton={ViewUtils.getLeftButton(()=>this.onBack())}
                    />
                <WebView
                    ref={webView=>this.webView=webView}
                    source={{uri:this.state.url}}
                    onNavigationStateChange={(e)=>this.onNavigationStateChange(e)}
                    startInLoadingState={true}
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