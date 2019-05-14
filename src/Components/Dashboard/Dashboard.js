import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'
import {getUser} from '../../Redux/Ducks/userReducer'
import axios from 'axios'
import NavBar from '../NavBar/NavBar';
import './Dashboard.css';


const Dashboard = (props) => {

    const [classList, updateClassList] = useState([])
    
    
    useEffect( () => {
        props.getUser()
        .then(res => {
            const {id} = res.value.userData
            axios.get(`/getc/api/getClassList?id=${id}lasses`)
            .then(response => {
                updateClassList(...classList, response)
            })
        })
        
    }, [])





    return(
        <>
        <NavBar />
        <div>
            <h1>Dashboard</h1>
            <h3>Hello</h3>
            
        </div>
        <div className="class-tiles-container">
                {classList.map((item) => {
                    return (
                        <div className="class-tiles">
                            <p>hi</p>
                        </div>
                    )
                })}  
        </div>
        </>
    )
}



function mapStateToProps(reduxState) {
    // console.log(reduxState)
    return {
      user: reduxState.user
    }
  };
  
  
  export default connect(mapStateToProps, { getUser })(Dashboard)