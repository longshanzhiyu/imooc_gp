/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View,
    ListView,
} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import {Navigator} from 'react-native-deprecated-custom-components';
import Boy from './Boy'
import ListViewTest from './ListViewTest'

export default class imooc_gp extends Component {
  constructor(props) {
    super(props);
    // const   ds=
    this.state={
      selectedTab:'tb_popular',
    }
  }

  render() {
    return (
      <View style={styles.container}>
          {/*<TabNavigator>
          <TabNavigator.Item
              selected={this.state.selectedTab === 'tb_popular'}
              selectedTitleStyle={{color:'red'}}
              title="最热"
              renderIcon={() => <Image style={styles.image} source={require('./res/images/ic_polular.png')} />}
              renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'red'}]} source={require('./res/images/ic_polular.png')} />}
              badgeText="1"
              onPress={() => this.setState({ selectedTab: 'tb_popular' })}>
              <View style={styles.page1}></View>
          </TabNavigator.Item>
          <TabNavigator.Item
            selected={this.state.selectedTab === 'tb_trending'}
            selectedTitleStyle={{color:'yellow'}}
            title="趋势"
            renderIcon={() => <Image style={styles.image} source={require('./res/images/ic_trending.png')} />}
            renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'yellow'}]} source={require('./res/images/ic_trending.png')} />}
            onPress={() => this.setState({ selectedTab: 'tb_trending' })}>
            <View style={styles.page2}></View>
          </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'tb_favourite'}
                selectedTitleStyle={{color:'red'}}
                title="收藏"
                renderIcon={() => <Image style={styles.image} source={require('./res/images/ic_polular.png')} />}
                renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'red'}]} source={require('./res/images/ic_polular.png')} />}
                // badgeText="1"
                onPress={() => this.setState({ selectedTab: 'tb_favourite' })}>
                <View style={styles.page1}></View>
            </TabNavigator.Item>
            <TabNavigator.Item
                selected={this.state.selectedTab === 'tb_my'}
                selectedTitleStyle={{color:'yellow'}}
                title="我的"
                renderIcon={() => <Image style={styles.image} source={require('./res/images/ic_trending.png')} />}
                renderSelectedIcon={() => <Image style={[styles.image,{tintColor:'yellow'}]} source={require('./res/images/ic_trending.png')} />}
                onPress={() => this.setState({ selectedTab: 'tb_my' })}>
                <View style={styles.page2}></View>
            </TabNavigator.Item>
        </TabNavigator> */}
          {/*<Navigator*/}
              {/*initialRoute={{*/}
                  {/*component:Boy*/}
              {/*}}*/}
              {/*renderScene={(route, navigator)=>{*/}
                  {/*let Component=route.component;*/}
                  {/*return <Component navigator={navigator} {...route.params}/>*/}
              {/*}}*/}
          {/*></Navigator>*/}
          <ListViewTest/>
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

AppRegistry.registerComponent('imooc_gp', () => imooc_gp);
