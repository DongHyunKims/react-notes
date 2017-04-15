/**
 * Created by donghyunkim on 2017. 4. 15..
 */

import React , { Component } from 'react';




const VideoPlayComponent = function(){


    return <div> </div>

};

const PlayListComponent = function () {
    
};

const VideoSearchComponent = function () {


};


class VideoComponent extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="video-scope">
                <div className="video-search-block">
                    <VideoSearchComponent />
                </div>

                <div className="video-play-block">
                    <VideoPlayComponent />
                </div>

                <div className="play-list-block">
                    <PlayListComponent />
                </div>
            </div>

        );
    }


}

export default VideoComponent;