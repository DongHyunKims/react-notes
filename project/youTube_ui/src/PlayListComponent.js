/**
 * Created by donghyunkim on 2017. 4. 16..
 */


import React, {Component} from "react";
import './playListComponent.css';

const PlayListDiv = function(props){

    return (
        <div className="play-div" id={props.id} onClick={props.onClick}>
            <div className="thumbnail-img"><img src={props.img} /></div>
            <div className="video-title">
                <h5>{props.title}</h5>
            </div>
        </div>
    );

};
const VideoPlayComponent = function(props){
    let video =  props.selectVideo;
    let id = video.id.videoId;

    let src = "https://www.youtube.com/embed/" + id + "?autoplay=1&rel=0&enablejsapi=1&frameborder=0&allowfullscreen";


    return <iframe width='100%' height='100%' src={src}></iframe>;

};

class PlayListComponent extends Component{

    constructor(props){
        super(props);

        this.state = {
            selectVideo : null,
            selectedIdx : 0,
        };
        console.log("ffff");
        this.filterItems = this.filterItems.bind(this);
    }

    filterItems(items){
        return items.map((item)=>{
            let itemObj = {
              id : item.id.videoId,
              snippet : item.snippet,
            };
            return itemObj;
        });

    }



    playListClickHandler(idx){

        let items = this.props.items;

        this.setState({selectVideo : items[idx], selectedIdx: idx,})
    }

    render(){
        let items = this.props.items;
        let selectVideo = this.state.selectVideo;

        let snippet = null;
        let title = null;
        let img = null;
        let playList = null;

        let videoPlayer = null;




        if(selectVideo){
            videoPlayer = <VideoPlayComponent selectVideo={selectVideo} />;


        }

        if(items){
            playList = this.filterItems(items).map((val,idx)=>{
                snippet = val.snippet;
                title = snippet.title;
                img = snippet.thumbnails.default.url;
                return <PlayListDiv key={val.id} title={title} img={img} id={val.id + "_" + idx} onClick={this.playListClickHandler.bind(this,idx)}/>
            });

        }







        return (
            <div className="play-list-block">


                <div className="video-play-block">
                    {videoPlayer}
                </div>

                <div className="video-list-block">
                    {playList}
                </div>
            </div>
        )

    }


}


export default PlayListComponent;


//<iframe width='100%' height='100%' src='https://www.youtube.com/embed/" + nameSpace.getvideoId[0] + "'?rel=0 & enablejsapi=1 frameborder=0 allowfullscreen></iframe>