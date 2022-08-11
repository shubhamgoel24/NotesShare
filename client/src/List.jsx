import React from "react";
import ListItem from './ListItem';

const List = (props) => {
    const {list} = props;
    return(
        list.slice(0).reverse().map( (item)=>{
            return(
                <ListItem
                    item = {item}
                    key = {item._id} 
                />
            )
                
        })
    )

}

export default List;    