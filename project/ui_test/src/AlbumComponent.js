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
        let opts = {
            controls : 1,
            autoplay : 0,
        };


        //controls=0
        //autoplay=1
        //playlist=XGSy3_Czz8k&loop=1
        return (
            <div className="album_block">
                <div className="video_block">
                    <YoutubePlayerComponent videoId="XGSy3_Czz8k" opts={opts}/>
                </div>

                <div className="album_list_block">
                <AlbumListComponent  />
                </div>
            </div>
        );
    }

}

export default AlbumComponent;