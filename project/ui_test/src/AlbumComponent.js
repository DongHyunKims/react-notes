/**
 * Created by donghyunkim on 2017. 4. 18..
 */
import React, {Component} from 'react';
import "./AlbumComponent.css";
import AlbumListComponent from "./AlbumListComponent"
import YoutubePlayerComponent from "./YoutubePlayerComponent";



class AlbumComponent extends Component {

    constructor(props){
        super(props);

    }

    render(){

        let videoData = this.props.videoData;



        let opts = {
            controls : 1,
            autoplay : 0,
        };


        let youtubePlayer = <h3>Loading...</h3>;

        if(videoData){
            youtubePlayer = <YoutubePlayerComponent videoId={videoData.items[0].id.videoId} opts={opts}/>
        }



        //controls=0
        //autoplay=1
        //playlist=XGSy3_Czz8k&loop=1
        return (
            <div className="album_block">
                <div className="video_block">
                    {youtubePlayer}
                </div>

                <div className="album_list_block">
                    <AlbumListComponent videoData={videoData} />
                </div>
            </div>
        );
    }

}

export default AlbumComponent;