    /**
     * Created by donghyunkim on 2017. 4. 15..
     */

    import React , { Component } from 'react';
    import utility from './utility';
    import './videoComponent.css';
    import PlayListComponent from './PlayListComponent';

    //const API_KEY = "AIzaSyBN5OGFLG7BQzpkKbG1ixxbjOvXSqzNztA";
    const CLIENT_ID = "426511628289-8d4bruoki6rgok53jevnl4d1pm25b1hb.apps.googleusercontent.com";
    const DEFAULT_URL = "https://www.googleapis.com/youtube/v3/search?part=snippet";


    const youtubeSetting = {
        order: 'viewCount',
        maxResults: 15,
        type: 'video',
        key : 'AIzaSyBN5OGFLG7BQzpkKbG1ixxbjOvXSqzNztA'
    };


    const VideoSearchComponent = function (props) {
        return <div className="video-search-block" ><input type="text" id="search-input"/> <input type="button" value="검색" onClick={props.onClick}/></div>
    };


    class VideoComponent extends Component{
        constructor(props){
            super(props);
            this.state = {
                videoList : null,
            };
            this.searchClickListener = this.searchClickListener.bind(this);
        }

        searchClickListener(event) {
            let q = utility.$selector("#search-input").value;

            let youtubeUrl = Object.keys(youtubeSetting).reduce((pre,post)=>{
              let query = "&" + post + "=" + youtubeSetting[post];
              return pre + query;
            },DEFAULT_URL);

            youtubeUrl += "&q=" + encodeURIComponent(q);

            console.log("youtubeUrl",youtubeUrl);
            utility.runAjax(this.requestListener.bind(this),"GET",youtubeUrl);


        }

        requestListener(res){

            console.log("jsonData",res.currentTarget.responseText);
            let jsonData = JSON.parse(res.currentTarget.responseText);

            this.setState({videoList : jsonData});

        }

        render(){
            let state = this.state;
            let items = null;
            if(state.videoList) {
                items = state.videoList.items;
                console.log("items",items);
            }
            return (

                <div className="video-scope">
                    <VideoSearchComponent onClick={this.searchClickListener}/>
                    <PlayListComponent items={items} />;
                </div>

            );
        }
    }

    export default VideoComponent;