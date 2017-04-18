/**
 * Created by donghyunkim on 2017. 4. 18..
 */
/**
 * Created by donghyunkim on 2017. 4. 18..
 */
import React, {Component} from 'react';
import "./AlbumListComponent.css";




const AlbumSectionComponent = function(){

    return (
        <div className="album_section">
        </div>
    );
};




class AlbumListComponent extends Component {

    constructor(props){
        super(props);

    }


    render(){


        let{lStyle, albumListData, albumListHandler } = this.props;


        if(!lStyle){
            lStyle = {
                width : "100%",
                height : "100%",
                backgroundColor : "lightgreen"
            }
        }


        // if(albumListData){
        //
        //
        // }

        return (
            <div className="album_list" style={lStyle}>
                <div className="album_menu">

                </div>
                <div className="album_section_list">
                    <AlbumSectionComponent />
                </div>
            </div>
        );
    }

}

export default AlbumListComponent;