import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux'
import {getUser} from '../../Redux/Ducks/userReducer'
import { Link } from 'react-router-dom'
import { CalculateAverage } from '../shared/MathCalculations';
import axios from 'axios'
import NavBar from '../NavBar/NavBar';
import './Dashboard.css';


const Dashboard = (props) => {

    const [classList, updateClassList] = useState([])
    const [grades, setGrades] = useState([]);
    const {getUser} = props
    
    
    useEffect( () => {
        getUser()
        .then(res => {
            const {id} = res.value.userData
            axios.get(`/api/getClassList?id=${id}`)
            .then(response => {
                updateClassList(response.data)
            })
            axios.get(`/api/profile/getGrades?id=${id}`).then(res => {
                setGrades(res.data);
                console.log(res.data);
              }).catch(err => console.log(err));
        }).catch(err => props.history.push('/'))
        
    }, [])

    console.log(grades);

    return(
        <div className="dashboard-component">
            <NavBar/>
            
            <div className="class-tiles-container">
                    
                    {classList.map((item, i) => {
                        let grade
                        if (grades[i]) {
                            grade = CalculateAverage(grades[i].pointspossible, grades[i].pointsrecieved)[1] + '%'
                        } else {
                            grade = 'N/A'
                        }
                        console.log(grade);
                        return (
                            <Link to={`/class/${item.classid}`} key={i}>
                                <div className="class-tiles" >
                                    <h2 style={{fontSize:25, fontWeight:600}}>{item.name}-{item.classid}</h2>
                                    <p>Start: {item.startdate}</p>
                                    <p>End: {item.enddate}</p>
                                    <p>{item.des}</p>
                                    <p>{grade}</p>
                                </div>
                            </Link>
                        )
                    })}  
            </div>
        </div>
    )
}



function mapStateToProps(reduxState) {
    // console.log(reduxState)
    return {
      user: reduxState.user
    }
  };
  
  
  export default connect(mapStateToProps, { getUser })(Dashboard)