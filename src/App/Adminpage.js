import React from 'react';
import AdminFunctions from '../Components/Admin/AdminFunctions'
function Adminpage(props) {
    return (
        <div>
            <AdminFunctions match = {props.match}/>
        </div>
    );
}

export default Adminpage;