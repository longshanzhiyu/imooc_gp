import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet, ListView,
    RefreshControl
} from 'react-native';
import NavigationBar from './NavigationBar';
import Toast, {DURATION} from 'react-native-easy-toast'

var data= {
    "result":[
        {
            "email": "s.hernandez@williams.net",
            "fullName": "章三张三"
        },
        {
            "email": "s.hernandez@williams.net",
            "fullName": "李四"
        }
    ],
    "statusCode":0,
};

export default class ListViewTest extends Component {

    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged:(r1,r2)=>r1!==r2});
        this.state={
            dataSource: ds.cloneWithRows(data.result),
            isLoading:true
        }
        this.onLoad();
    }

    renderRow(item){
        return <View style={styles.row}>
            <TouchableOpacity onPress={()=>{
                this.toast.show('你单击了:'+item.fullName, DURATION.LENGTH_SHORT)
            }}>
                <Text style={styles.tips}>{item.fullName}</Text>
                <Text>{item.email}</Text>
            </TouchableOpacity>
        </View>
    }

    renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
        return <View key={rowID} style={styles.line}></View>
    }

    renderFooter(){
        //当image加载网络属性的时候 默认尺寸为零，显示不出来 添加尺寸后，才能显示出来
        return <Image style={{width:400, height:100}} source={{uri:'https://images.gr-assets.com/hostedimages/1406479536ra/10555627.gif'}}></Image>
    }

    onLoad() {
        setTimeout(()=>{
            this.setState({
                isLoading:false
            })
        }, 2000)
    }

    render(){
        return (
            <View style={styles.container}>
                <NavigationBar
                title={'ListViewTest'}
                />
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(item)=>this.renderRow(item)}
                    renderSeparator={()=>this.renderSeparator()}
                    renderFooter={()=>this.renderFooter()}
                    refreshControl={<RefreshControl
                        refreshing={this.state.isLoading}
                        onRefresh={()=>this.onLoad()}
                    />}
                />
                {/*//注意：此控件要写在最底部*/}
                <Toast ref={toast=>{this.toast=toast}}/>
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
    text:{
        fontSize:20,
    },
    tips:{
        fontSize: 18
    },
    row: {
        height:50
    },
    line:{
        height: 1,
        backgroundColor: 'black',
    }

})