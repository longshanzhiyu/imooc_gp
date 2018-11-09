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

    render() {
        return (
            <View style={styles.container}>
                <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_popular'}
                        selectedTitleStyle={{color:'#2196F3'}}
                        title="最热"
                        renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_polular.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'#2196F3'}]} source={require('../../res/images/ic_polular.png')} />}
                        // badgeText="1"
                        onPress={() => this.setState({ selectedTab: 'tb_popular' })}>
                        <PopularPage {...this.props}/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_trending'}
                        selectedTitleStyle={{color:'yellow'}}
                        title="趋势"
                        renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_trending.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'yellow'}]} source={require('../../res/images/ic_trending.png')} />}
                        onPress={() => this.setState({ selectedTab: 'tb_trending' })}>
                        <TrendingPage/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_favourite'}
                        selectedTitleStyle={{color:'red'}}
                        title="收藏"
                        renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_polular.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'red'}]} source={require('../../res/images/ic_polular.png')} />}
                        // badgeText="1"
                        onPress={() => this.setState({ selectedTab: 'tb_favourite' })}>
                        <WebViewTest/>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'tb_my'}
                        selectedTitleStyle={{color:'yellow'}}
                        title="我的"
                        renderIcon={() => <Image style={styles.image} source={require('../../res/images/ic_trending.png')} />}
                        renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'yellow'}]} source={require('../../res/images/ic_trending.png')} />}
                        onPress={() => this.setState({ selectedTab: 'tb_my' })}>
                        <MyPage {...this.props}></MyPage>
                    </TabNavigator.Item>
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

