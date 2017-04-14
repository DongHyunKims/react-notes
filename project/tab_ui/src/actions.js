/**
 * Created by donghyunkim on 2017. 4. 13..
 */

//action type 정
export const SET_DATA = "SET_DATA";
export const GET_DATA = "GET_DATA";



//action creator
export function setData (data){
    return {
        type: SET_DATA,
        data,
    };
}

export function getData (selectedKey){
    return {
        type: GET_DATA,
        selectedKey,
    }
}