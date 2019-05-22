module.exports = {

divide: function(num1, num2) {
    return num1 / num2 * 100
  },
  
logout: function() {
    props.logOutUser();
    window.location.reload();
    },
    
    
deleteEvent: function() {
    axios.delete(`/api/deleteEvent/${props.event.id}`)
    .catch(err => console.log(err))
    props.getData();
    }
};


// toggleAddEvent: function() {
//     this.setState({addEvent: !this.state.addEvent})
// }


// export async function handleEditTitle() {
//     axios.put('/api/editTitle', {id: props.event.id, title: editText})
//       .catch(err => console.log(err))
//     await props.getData();
//     setEditEvent(false)
//   }


// export function addAssignment() {
//     const post = {
//       name,
//       description,
//       points,
//       dueDate,
//       type,
//       classid: props.classid,

//     }
//     axios.post('/api/class/addAssignment', post).then(res => {
//       props.updateForum(res.data);
//     }).catch(err => console.log('error adding post'));
//     props.toggleAdd()
//   }


//   function addPost() {
//     const post = {
//       id: props.id,
//       classid: props.classid,
//       post: newPost
//     }
//     axios.put('/api/class/addPost', post).then(res => {
//       props.updateForum(res.data);
//     }).catch(err => console.log('error adding post'));
//     props.toggleAdd()
//   }

//   async function handleLogin() {
//     const loginInfo = {email, password}
//     const user = await props.loginUser(loginInfo)
//     if (user.value.loggedIn) props.history.push('/dashboard');
// }

//   useEffect(() => {

//     axios.get(`/api/class/classStudents?id=${classID}`).then((res) => {
//       return setStudents(res.data)
//     }).catch(() => console.log('could not get at this time'))
//   }, [])


//   function cancel () {
//     setEditToggle(false)
//     setFirstName(props.user.firstName)
//     setLastName(props.user.lastName)
//     setEmail(props.user.email)
//     setImg(props.user.img)
//     setPhoneNumber(props.user.phoneNumber)
//   }