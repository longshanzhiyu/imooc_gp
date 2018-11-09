
import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    ListView,
    Image,
    RefreshControl,
    DeviceEventEmitter,
    TouchableOpacity,
} from 'react-native';
import NavigationBar from '../common/NavigationBar';
import DataRepository,{FlAG_STORAGE} from '../expand/dao/DataRepository';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import TrendingCell from '../common/TrendingCell';
import LanguageDao,{FLAG_LANGUAGE} from '../expand/dao/LanguageDao';
import RepositoryDetail from './RepositoryDetail';
import TimeSpan from '../model/TimeSpan';
import Popover from '../common/Popover';

const API_URL='https://github.com/trending/'

var timeSpanTextArray = [
    new TimeSpan('今 天', 'since=daily'),
    new TimeSpan('本 周', 'since=weekly'),
    new TimeSpan('本 月', 'since=monthly'),
];

export default class TrendingPage extends Component{
    constructor(props) {
        super(props);
        this.languageDao = new LanguageDao(FLAG_LANGUAGE.flag_language);
        this.state = {
            languages:[],
            isVisible:false,
            buttonRect:{},
            timeSpan:timeSpanTextArray[0],
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

    showPopover() {
        this.refs.button.measure((ox, oy, width, height, px, py) => {
            this.setState({
                isVisible: true,
                buttonRect: {x: px, y: py, width: width, height: height}
            });
        });
    }

    renderTitleView(){
        return <View>
            <TouchableOpacity
                ref='button'
                onPress={()=>this.showPopover()}
            >
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                        style={{
                            fontSize: 18,
                            color:'white',
                            fontWeight: '400'
                        }}
                    >趋势{this.state.timeSpan.showText}</Text>
                    <Image
                        style={{width:12, height: 12, marginLeft: 5}}
                        source={require('../../res/images/ic_spinner_triangle.png')}/>
                </View>
            </TouchableOpacity>
        </View>
    }

    closePopover(){
        this.setState({
            isVisible:false
        })
    }

    onSelectTimeSpan(timeSpan) {
        // this.closePopover();
        // DeviceEventEmitter.emit(EVENT_TYPE_TIME_SPAN_CHANGE,this.state.timeSpan,timeSpan);
        this.setState({
            timeSpan: timeSpan,
            isVisible:false
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
                return lan.checked? <TrendingTab tabLabel={lan.name} timeSpan={this.state.timeSpan} {...this.props}></TrendingTab>:null
            })}

            {/*<PopularTab tabLabel='IOS'>IOS</PopularTab>*/}
            {/*<PopularTab tabLabel='ANDROID'>android</PopularTab>*/}
            {/*<PopularTab tabLabel='JAVASCRIPT'>js</PopularTab>*/}
        </ScrollableTabView>:null;

        let timeSpanView = <Popover
            isVisible={this.state.isVisible}
            fromRect={this.state.buttonRect}
            placement="bottom"
            contentStyle={{backgroundColor:'#343434', opacity:0.82}}
            onClose={()=>this.closePopover()}
        >
            {timeSpanTextArray.map((result, i, arr)=>{
                return <TouchableOpacity
                    key={i}
                    underlayColor = 'transparent'
                    onPress={()=>this.onSelectTimeSpan(arr[i])}
                >
                    <Text
                        onPress={()=>this.onSelectTimeSpan(arr[i])}
                        style={{fontSize:18, color: 'white',padding:8, fontWeight: '400'}}
                    >{arr[i].showText}</Text>
                </TouchableOpacity>
            })}
        </Popover>
        return <View style={styles.container}>
            <NavigationBar
                // title={'趋势'}
                // style={{backgroundColor:'#6495ED'}}
                titleView={this.renderTitleView()}
                statusBar={{
                    backgroundColor:'#2196F3'
                }}
            />
            {content}
            {timeSpanView}

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
        this.loadData(this.props.timeSpan, true);
    }

    updateState(dic){
        if(!this)return;
        this.setState(dic);
    }

    getFetchUrl(timeSpan,category){
        return API_URL + category + '?' + timeSpan.searchText;
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.timeSpan !== this.props.timeSpan) {
            this.loadData(nextProps.timeSpan)
        }
    }

    loadData(timeSpan, isRefresh ){
        this.updateState({
            isLoading:true
        })
        let url = this.getFetchUrl(timeSpan, this.props.tabLabel);
        this.dataRespository
            .fetchRepository(url)
            .then(result=>{
                let items=result&&result.items?result.items:result?result:[];
                this.updateState({
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
                this.updateState({
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

    onRefresh(){
        this.loadData(this.props.timeSpan);
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
                          onRefresh={()=>this.onRefresh()}
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