/**
 * Created by donghyunkim on 2017. 4. 11..
 */
import React, { Component } from 'react';
import utility from './utility';
import { connect } from 'react-redux';
import { getData } from './actions';



const TabButton = function(props) {

    let styles = {};
    let key = Number(props.currentKey);
    let selectedKey = Number(props.selectedKey);

    if(key === selectedKey){
        styles = {
            backgroundColor: "#79F8BB"
        }
    }else{
        styles = {
            backgroundColor: "white"
        }
    }

    return <div className="tab_button" style={styles} id={props.tabId} onClick={props.onClick} >{props.tabName }</div>
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
    }

    render(){
        let {content,selectedKey} = this.props.state;
        let {titleList} = this.props;
        let tabButton = titleList.map((val,key)=>{
            let tabId = "tabButton_" + key;
            return (<TabButton key={key} tabName={val} tabId={tabId} onClick={this.props.tabClickHandler.bind(this,key)} selectedKey={selectedKey} currentKey={key} />);
        });
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

function mapStateToProps(state){
    return {
        state : state,
    };
}

function mapDispatchToProps(dispatch){
    return {
        tabClickHandler(key){
            //console.log("selectedKey",selectedKey);
            dispatch(getData(key));
        },

    };
}

const TabContainer = connect(mapStateToProps,mapDispatchToProps)(Tab);


export default TabContainer;