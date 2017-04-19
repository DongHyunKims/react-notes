/**
 * Created by donghyunkim on 2017. 4. 18..
 */
/**
 * Created by donghyunkim on 2017. 4. 18..
 */
import React, {Component} from 'react';
import "./AlbumListComponent.css";



const AlbumSectionComponent = function(props){

    let videoSnippet = props.videoSnippet;
    let title = videoSnippet.title;
    return (
        <div className="album_section" onClick={props.onClick}>
            {title}
        </div>
    );
};




class AlbumListComponent extends Component {

    constructor(props){
        super(props);

    }

    render(){
        let{lStyle, videoData, albumListClickHandler } = this.props;
        console.log("albumListClickHandler",albumListClickHandler);


        if(!lStyle){
            lStyle = {
                width : "100%",
                height : "100%",
                backgroundColor : "lightgreen",
            }
        }


        let albumSectionList = <h2>Album에 저장된 데이터가 없습니다</h2>;
        //videoData.items[0].id.videoId
        if(videoData){
            let items = videoData.items;
            albumSectionList = items.map((val,key)=>{
                let videoSnippet = val.snippet;
                return  <AlbumSectionComponent key={val.id.videoId} videoSnippet={videoSnippet} onClick={albumListClickHandler.bind(null,key)} />;
            });

        }


/*

 <div className="album_menu">

 </div>
 */
        return (
            <div className="album_list" style={lStyle}>
                <div className="album_menu">

                </div>
                <div className="album_section_list" >
                    {albumSectionList}
                </div>
            </div>
        );
    }

}

export default AlbumListComponent;