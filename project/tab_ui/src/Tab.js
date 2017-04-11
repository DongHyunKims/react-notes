/**
 * Created by donghyunkim on 2017. 4. 11..
 */
import React, { Component } from 'react';
import utility from './utility';


const TabButton = function(props) {
    return <div className="tab_button" id={props.tabId} onClick={props.clickHandler} >{ props.tabName }</div>
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
        };
        this.tabClickHandler = this.tabClickHandler.bind(this);
    }



    tabClickHandler(event){
            let currentEventTarget = event.target;
            let divId = currentEventTarget.id;
            let idx = Number(divId.split("_")[1]);
            let allDom = document.querySelectorAll(".tab_button");
            allDom.forEach((element)=>{
                element.style.backgroundColor = "white";
            });
            let selectDom = utility.$selector("#"+divId);
            selectDom.style.backgroundColor = "#79F8BB";

            this.setState({content : this.props.data[idx]});
    }

    componentDidMount(){
        let selectDom = document.querySelector(".tab_button");
        selectDom.style.backgroundColor = "#79F8BB";
    }



        render(){
        let buttonName = this.props.titleList;
        let tabButtonJSX = buttonName.map((val,key)=>{
            let tabId = "tabButton_" + key;
            return (<TabButton key={key} tabName={val} tabId={tabId} clickHandler={this.tabClickHandler} />);
        });

        //this.setState({state : this.state.data[0]});

        let content = this.state.content;
        //console.log("data",content);


        return (
            <div className="tab_scope">
            <div className="tab_btn_scope">
                {tabButtonJSX}
            </div>
                <TabPanel content={content}/>

            </div>

        )
    };

}


export default Tab;