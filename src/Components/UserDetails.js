import React from 'react';

function UserDetails(props) {
    console.log(props.userData);
    let imgSrc='';
    let userName;
    let first;
    let last;
    let email;
    let gender;
    let phone;
    if(props.userData){
    const userData = props.userData;
    imgSrc = userData.picture.small;
    const {title,first,last} = props.userData.name;
    userName = title + ' ' + first + ' ' + last;
    email = userData.email;
    phone = userData.phone;
    gender = userData.gender;
    }
    return (
        <div>
         User Details
         <img src={imgSrc} alt={userName} />
          Name : {first + ' ' + last}
          Email-ID : {email}
          Phone : {phone}
          Gender : {gender}
        </div>
    );
}

export default UserDetails;