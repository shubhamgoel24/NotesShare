import React from "react";
const ListItem = (props) => {
    const {_id,description,createdAt} = props.item;
    return(
        <li className="row item justify-content-between" id={_id}>
            <input type="checkbox" className="col-1 listitem" id={ _id }></input>
            <div className="col-7">
                <pre id="notedisc" className="row" dangerouslySetInnerHTML={{__html: description}}></pre>
            </div>
            <div className="col-3">
                <div id="notedate" className="row">{Intl.DateTimeFormat('en-GB', {year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(Date.parse(createdAt)))}</div>
            </div>
        </li>
    );
}

export default ListItem;    