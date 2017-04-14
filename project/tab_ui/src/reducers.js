/**
 * Created by donghyunkim on 2017. 4. 14..
 */
import {combineReducers} from 'redux';


import {SET_DATA, GET_DATA} from "./actions";

const initialState = {
    data : null,
    content : null,
    selectedKey : 0
};

const appReducer = (state = initialState, action) => {
    console.log("action",action);
    console.log("state",state);
    switch (action.type){
        case SET_DATA : return Object.assign({}, state, {data : action.data, content : action.data[0]});
        case GET_DATA : return Object.assign({}, state, {content : state.data[action.selectedKey],selectedKey: action.selectedKey});
        default : return state;
    }

};

export default appReducer;