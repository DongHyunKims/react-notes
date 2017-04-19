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
        this.state = {
            selectedData : null,
            selectedKey : 0,
        };
        this.albumListClickHandler = this.albumListClickHandler.bind(this);


    }
    albumListClickHandler(key){

        let videoData = this.props.videoData;
        this.setState({selectedData : videoData.items[key], selectedKey : key});
    }

    render(){

        let videoData = this.props.videoData;
        let selectedData = this.state.selectedData;

        let opts = {
            controls : 1,
            autoplay : 1,
        };
        console.log("selectedData",selectedData);


        // default 사진 제공
        let youtubePlayer = <h3>Loading...</h3>;

        if(selectedData){
            youtubePlayer = <YoutubePlayerComponent videoId={selectedData.id.videoId} opts={opts}/>
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
                    <AlbumListComponent videoData={videoData} albumListClickHandler={this.albumListClickHandler} />
                </div>
            </div>
        );
    }

}

export default AlbumComponent;