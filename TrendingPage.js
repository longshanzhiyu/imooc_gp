import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    AsyncStorage,
    TextInput,
} from 'react-native';
import NavigationBar from './js/common/NavigationBar';
import Toast, {DURATION} from 'react-native-easy-toast';
import DataRepository,{FlAG_STORAGE} from './js/expand/dao/DataRepository';
const URL='https://github.com/trending/'

export default class TrendingPage extends Component {
    constructor(props) {
        super(props);
        this.dataRepository = new DataRepository(FlAG_STORAGE.flag_trending);
        this.state={
            result:'',
        }
    }

    onLoad(){
        let url = URL+this.text;
        this.dataRepository.fetchRepository(url)
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
                    title={'GitHubTrending的使用'}
                    style={{
                        backgroundColor:'#6495ED'
                    }}
                    />
                <TextInput
                    style={{borderWidth: 1, height:40, margin: 6}}
                    onChangeText={text=>this.text=text}
                />
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.tips}
                          onPress={()=>this.onLoad()}
                    >加载数据</Text>
                    <Text style={{flex: 1}}>{this.state.result}</Text>
                </View>
                {/*<Toast ref={toast=>this.toast=toast}/>*/}
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        flex: 1,
    },
    tips:{
        fontSize:29,
        margin: 5,
    }
})