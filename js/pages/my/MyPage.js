
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import NavigationBar from '../../common/NavigationBar';
import CustomKeyPage from './CustomKeyPage';
import SortKeyPage from './SortKeyPage';
import {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao';

export default class MyPage extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return <View style={styles.container}>
            <NavigationBar
                title={'我的'}
                style={{backgroundColor:'#6495ED'}}
            />
            <Text
                style={styles.tips}
                onPress={() => {
                    this.props.navigator.push({
                        component: CustomKeyPage,
                        params: {
                            ...this.props,
                            flag:FLAG_LANGUAGE.flag_key,
                            isRemoveKey:false
                        }
                    })
                }}
            >自定义标签</Text>
            <Text
                style={styles.tips}
                onPress={() => {
                    this.props.navigator.push({
                        component: CustomKeyPage,
                        params: {
                            ...this.props,
                            flag:FLAG_LANGUAGE.flag_language,
                            isRemoveKey: false,
                        }
                    })
                }}
            >自定义语言</Text>
            <Text
                style={styles.tips}
                onPress={()=>{
                    this.props.navigator.push({
                        component:SortKeyPage,
                        params:{
                            ...this.props,
                            flag:FLAG_LANGUAGE.flag_key,
                        }
                    })
                }}
            >标签排序</Text>
            <Text
                style={styles.tips}
                onPress={()=>{
                    this.props.navigator.push({
                        component:SortKeyPage,
                        params:{
                            ...this.props,
                            flag:FLAG_LANGUAGE.flag_language
                        }
                    })
                }}
            >语言排序</Text>
            <Text
                style={styles.tips}
                onPress={()=>{
                    this.props.navigator.push({
                        component:CustomKeyPage,
                        params:{
                            ...this.props,
                            isRemoveKey: true,
                            flag:FLAG_LANGUAGE.flag_key,
                        }
                    })
                }}
            >标签移除</Text>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    tips:{
        fontSize:29
    }
})