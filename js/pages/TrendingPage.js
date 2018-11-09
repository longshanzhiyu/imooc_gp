
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ListView,
    RefreshControl,
    DeviceEventEmitter,
} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import DataRepository,{FlAG_STORAGE} from '../expand/dao/DataRepository';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import TrendingCell from '../common/TrendingCell';
import LanguageDao,{FLAG_LANGUAGE} from '../expand/dao/LanguageDao';
import RepositoryDetail from './RepositoryDetail';

const API_URL='https://github.com/trending/'

export default class TrendingPage extends Component{
    constructor(props) {
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_language);
        this.state = {
            languages:[]
        }
    }

    componentDidMount(){
        this.loadData();
    }

    loadData(){
        this.languageDao.fetch()
            .then(result=>{
                this.setState({
                    languages:result
                })
            })
            .catch(error=>{
                console.log(error);
            })
    }


    render(){
        let content=this.state.languages.length>0?<ScrollableTabView
            renderTabBar={() => <ScrollableTabBar/>}
            tabBarBackgroundColor="#2196F3"
            tabBarInactiveTextColor="mintcream"
            tabBarActiveTextColor="white"
            tabBarUnderlineStyle={{backgroundColor:'#e7e7e7', height:2}}
            initialPage={0}
            // style={{backgroundColor:'red'}}
        >
            {this.state.languages.map((result, i, arr)=>{
                let lan= arr[i];
                return lan.checked? <TrendingTab tabLabel={lan.name} {...this.props}></TrendingTab>:null
            })}

            {/*<PopularTab tabLabel='IOS'>IOS</PopularTab>*/}
            {/*<PopularTab tabLabel='ANDROID'>android</PopularTab>*/}
            {/*<PopularTab tabLabel='JAVASCRIPT'>js</PopularTab>*/}
        </ScrollableTabView>:null;

        return <View style={styles.container}>
            <NavigationBar
                title={'趋势'}
                // style={{backgroundColor:'#6495ED'}}
                statusBar={{
                    backgroundColor:'#2196F3'
                }}
            />
            {content}

        </View>
    }
}

class TrendingTab extends Component{
    constructor(props){
        super(props);
        this.dataRespository = new DataRepository(FlAG_STORAGE.flag_trending);
        this.state = {
            result:'',
            dataSource: new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2}),
            isLoading:false,
        }
    }

    componentDidMount(){
        this.loadData();
    }

    getFetchUrl(timeSpan,category){
        return API_URL + category + timeSpan.searchText;
    }

    loadData(){
        this.setState({
            isLoading:true
        })
        let url = this.getFetchUrl('?since=daily', this.props.tabLabel);
        this.dataRespository
            .fetchRepository(url)
            .then(result=>{
                let items=result&&result.items?result.items:result?result:[];
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(items),
                    // result:JSON.stringify(result),
                    isLoading:false
                });
                if (result && result.update_date && this.dataRespository.checkData(result.update_date)) {
                    return this.dataRespository.fetchNetRepository(url);
                    DeviceEventEmitter.emit('showToast', '数据过时');
                }
                else {
                    DeviceEventEmitter.emit('showToast', '显示缓存数据');
                }
            })
            .then(items=>{
                if (!items||items.length===0)return;
                this.setState({
                    dataSource:this.state.dataSource.cloneWithRows(items),
                    // result:JSON.stringify(result),
                    isLoading:false
                })
                DeviceEventEmitter.emit('showToast', '显示网络数据');
            })
            .catch(error=>{
                console.log(error);
            })
    }

    onSelect(item){

        this.props.navigator.push({
            component:RepositoryDetail,
            params:{
                item:item,
                ...this.props,
            }
        })
    }

    renderRow(data){
        return <TrendingCell
            onSelect={()=>this.onSelect(data)}
            key={data.id}
            data={data}/>
    }

    render(){
        return <View style={{flex:1}}>
            <ListView dataSource={this.state.dataSource}
                      renderRow={(data)=>this.renderRow(data)}
                      refreshControl={<RefreshControl
                          refreshing={this.state.isLoading}
                          onRefresh={()=>this.loadData()}
                          colors={['#2196F3']}
                          tintColor={'#2196F3'}
                          title={'Loading...'}
                          titleColor={'#2196F3'}
                      />}
            />
        </View>
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'red'
    },
    tips: {
        fontSize:29
    }
})