/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,
    DeviceEventEmitter,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import PopularPage from './PopularPage';
import MyPage from "./my/MyPage";
import Toast, {DURATION} from 'react-native-easy-toast';
import WebViewTest from '../../WebViewTest';
import TrendingPage from "./TrendingPage";


export default class HomePage extends Component {
    constructor(props) {
        super(props);
        //const ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});
        this.state={
            selectedTab:'tb_popular',
        }
    }

    componentDidMount(){
        this.listener = DeviceEventEmitter.addListener('showToast', (text)=>{
            this.toast.show(text, DURATION.LENGTH_SHORT);
        })
    }

    componentWillUnmount() {
        this.listener&&this.listener.remove();
    }

    _renderTab(Component, selectTab, title, renderIcon){
        return <TabNavigator.Item
            selected={this.state.selectedTab === selectTab}
            selectedTitleStyle={{color:'#2196F3'}}
            title={title}
            renderIcon={() => <Image style={styles.image} source={renderIcon} />}
            renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'#2196F3'}]} source={renderIcon} />}
            // badgeText="1"
            onPress={() => this.setState({ selectedTab: selectTab })}>
            <Component {...this.props}/>
        </TabNavigator.Item>
    }

    render() {
        return (
            <View style={styles.container}>
                <TabNavigator>

                    {this._renderTab(PopularPage, 'tb_popular', "最热", require('../../res/images/ic_polular.png'))}
                    {this._renderTab(TrendingPage, 'tb_trending', "趋势", require('../../res/images/ic_trending.png'))}
                    {this._renderTab(WebViewTest, 'tb_favourite', "收藏", require('../../res/images/ic_favorite.png'))}
                    {this._renderTab(MyPage, 'tb_my', "我的", require('../../res/images/ic_my.png'))}
                </TabNavigator>
                <Toast ref={toast=>this.toast=toast}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    page1:{
        backgroundColor:'red',
        flex:1,
    },
    page2:{
        backgroundColor:'yellow',
        flex:1,
    },
    image:{
        height:22,
        width:22
    }
});

