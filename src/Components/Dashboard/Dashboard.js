import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { getUser } from '../../Redux/Ducks/userReducer'
import { Link } from 'react-router-dom'
import { CalculateAverage } from '../shared/MathCalculations';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios'
import NavBar from '../NavBar/NavBar';
import './Dashboard.css';

const styles = theme => ({
    progress: {
        margin: theme.spacing.unit * 2,
    },
});


const Dashboard = (props) => {

    const [classList, updateClassList] = useState([])
    const [grades, setGrades] = useState([]);
    const { getUser, classes } = props


    useEffect(() => {
      return () => {
        return classList
      };
    }, [classList])

    useEffect(() => {
      return () => {
        return grades
      };
    }, [grades])

    useEffect(() => {
        getUser()
            .then(res => {
                const { id } = res.value.userData
                axios.get(`/api/getClassList?id=${id}`)
                    .then(response => {
                        updateClassList(response.data)
                    })
                axios.get(`/api/profile/getGrades/${id}`).then(res => {
                    setGrades(res.data);
                    console.log(res.data);
                }).catch(err => console.log(err));
            }).catch(() => props.history.push('/'))

    }, [])

    function showClasses() {
        if (classList.length) {
            return classList.map((item, i) => {
                let grade
                if (grades[i]) {
                    grade = CalculateAverage(grades[i].pointspossible, grades[i].pointsrecieved)
                }
                return (
                    <Link to={`/class/${item.classid}`} key={i}>
                        <div className="class-tiles" >
                            <h2 style={{ fontSize: 25, fontWeight: 600 }}>{item.name}-{item.classid}</h2>
                            <p>Start: {item.startdate}</p>
                            <p>End: {item.enddate}</p>
                            <p>{item.des}</p>                            

                            {!props.user.isTeacher ? (Array.isArray(grade) ? (
                                <>
                                    <p>{grade[0]}</p>
                                    <p>{grade[1]}%</p>
                                </>
                            ) : (
                                <p>No grades available</p>
                            )) : (
                                <h1>You have 50 students</h1>
                            )}
                        </div>
                    </Link>
                )
            })
        } else {
            console.log('hi');
            return (
                <div>
                    <CircularProgress className={classes.progress} size={50} color="secondary" />
                </div>
            )
        }
    }

    return (
        <div className="dashboard-component">
            <NavBar />
            <div className='dashboard-right-container'>
                <header className="myProfileFlagContainerD">
                    <div className="flagTriangleD"></div>
                    <div className="myProfileFlagD"> PROFILE</div>
                </header>
                <div className="class-tiles-container">
                    {showClasses()}
                </div>
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


export default connect(mapStateToProps, { getUser })(withStyles(styles)(Dashboard))