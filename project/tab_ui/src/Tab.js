/**
 * Created by donghyunkim on 2017. 4. 11..
 */
import React, { Component } from 'react';
import utility from './utility';


const TabButton = function(props) {

    let styles = {};

    let key = Number(props.tabId.split("_")[1]);
    let selectedKey = Number(props.selectedKey);
    //
    // console.log("key",key);
    //
    // console.log("selectedKey",selectedKey);
    if(key === selectedKey){
        styles = {
            backgroundColor: "#79F8BB"
        }
    }else{
        styles = {
            backgroundColor: "white"
        }
    }

    return <div className="tab_button" style={styles} id={props.tabId} onClick={props.onClick} >{ props.tabName }</div>
};

const TabPanel = function(props){
    let content = props.content;

    let contentList = content.newslist.map((value,idx)=>{
        return (<p key={idx}>{value}</p>);
    });

    return <div className="tab_panel">
            <h3>{content.title}</h3>
            <img src={content.imgurl}/>
            <ul>
                {contentList}
            </ul>
           </div>;
};

class Tab extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            content : this.props.data[0],
            selectedKey : 0,
        };
        this.tabClickHandler = this.tabClickHandler.bind(this);
    }


    // handler에서는 state 조작만 해주면 된다.

    tabClickHandler(event){
        let currentEventTarget = event.target;
        let divId = currentEventTarget.id;
        let selectedKey = Number(divId.split("_")[1]);
        //console.log("selectedKey",selectedKey);
        this.setState({content : this.props.data[selectedKey] , selectedKey : selectedKey});
    }

        render(){
        let buttonName = this.props.titleList;
        let selectedKey = this.state.selectedKey;
        let tabButton = buttonName.map((val,key)=>{
            let tabId = "tabButton_" + key;
            return (<TabButton key={key} tabName={val} tabId={tabId} onClick={this.tabClickHandler} selectedKey={selectedKey} />);
        });

        //this.setState({state : this.state.data[0]});

        let content = this.state.content;
        //console.log("data",content);


        return (
            <div className="tab_scope">
            <div className="tab_btn_scope">
                {tabButton}
            </div>
                <TabPanel content={content}/>
            </div>

        )
    };

}


export default Tab;