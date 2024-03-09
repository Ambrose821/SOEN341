import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../apiServices/AuthContext';

const ProfileSettings = () => {
    const { isLoggedIn, currentUser, currentUserFirstName, currentUserLastName, currentUserFlag, updateAdmin, updateUserInfo,deleteUser } = useAuth();
    const [update, setUpdate] = useState("");

    const [profileCurrentUser, setProfileCurrentUser] = useState(currentUser);
    const [profileCurrentUserFirstName, setProfileCurrentUserFirstName] = useState(currentUserFirstName);
    const [profileCurrentUserLastName, setProfileCurrentUserLastName] = useState(currentUserLastName);
    const [profileCurrentUserFlag, setProfileUserFlag] = useState(currentUserFlag);

    const [profileIsLoggedIn, setProfileIsLoggedIn] = useState(isLoggedIn);
    const [changeVariable, setChangeVariable] = useState('');
    const [newVariable, setNewVariable] = useState('');
    const [requestValueKey, setRequestValueKey] = useState('');
    const [newVariableError, setNewVariableError] = useState('');
    const [responseError, setResponseError] = useState('');
    const [workDone, setWorkDone] = useState(false);

    const handleNewVariableChange = (e) => {
        setNewVariable(e.target.value);
    };


    async function handleButton(event) {
        const changeType = event.target.textContent;

        switch (changeType) {
            case 'Change First Name':
                setChangeVariable('Enter New First Name');
                break;
            case 'Change Last Name':
                setChangeVariable('Enter New Last Name');
                break;
            case 'Change Email':
                setChangeVariable('Enter New Email');
                break;
            case 'Change Password':
                setChangeVariable('Enter New Password');
                break;
        }
    }


    const changeInfo = async (event) => {
        event.preventDefault();
        var newFirstName = '';
        var newLastName = '';
        var newEmail = '';
        var newPassword = '';

        if (!newVariable) {
            setNewVariableError('Field Required');
            return;
        }
        switch (changeVariable) {
            case 'Enter New First Name':
                newFirstName = newVariable;
                break;
            case 'Enter New Last Name':
                newLastName = newVariable;
                break;
            case 'Enter New Email':
                newEmail = newVariable;
                break;
            case 'Enter New Password':
                newPassword = newVariable;
                break;
        }

        try {
            const userEmail = currentUser;
            const response = await fetch('http://localhost:9000/users/changeUserInfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userEmail, newFirstName, newLastName, newPassword, newEmail })
            });

            const data = await response.json();
            await updateUserInfo(data.accessToken);
            setResponseError(data.message);
            setWorkDone(true);
        } catch (err) {
            console.error(err);
        }
    }

    async function handleDelete() {
        try {
            const response = await fetch('http://localhost:9000/users/deleteUser', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ currentUser })
            });
            const data = await response.json();
            setResponseError(data.message);
            setWorkDone(true);
            await deleteUser();// Update workDone state after successful deletion
        } catch (err) {
            console.error(err);
            setResponseError(err);
        }
    }
    if (workDone) {
        return  <Navigate to='/' replace ={true} />
    }

    // Return statement added here
    return (
        <div>
            <h2>User Profile</h2>
            <div>
                {/* profile picture */}
            </div>
            <div>
                {profileCurrentUserFlag && <p>Flag: {profileCurrentUserFlag}</p>}
                {profileCurrentUserFirstName && <p>First Name: {profileCurrentUserFirstName} <button onClick={handleButton}>Change First Name</button></p>}
                {profileCurrentUserLastName && <p>Last Name: {profileCurrentUserLastName} <button onClick={handleButton}>Change Last Name</button></p>}
                <p>Email: {profileCurrentUser} <button onClick={handleButton}>Change Email</button></p>
                <button onClick={handleButton}>Change Password</button>
                {changeVariable &&
                    <form onSubmit={changeInfo}>
                        <div className='form-group'>
                            <label>{changeVariable}</label>
                            <input type="text" onChange={handleNewVariableChange} />
                            {newVariableError && <p className="error">{newVariableError}</p>}
                        </div>
                        <button type="submit">Submit</button>
                    </form>}
            </div>
            <div>
                {responseError && <p>{responseError}</p>}
            </div>
            {workDone && <Navigate to='/profile' replace={true}></Navigate>}
            <button onClick={handleDelete}>Delete User</button>
        </div>
    );
}

export default ProfileSettings;
