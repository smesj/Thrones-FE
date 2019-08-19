import React, { useState, useEffect } from 'react';
import { useAuth0 } from "../react-auth0-wrapper";
import { Formik, Form } from 'formik';
import TextField from '@material-ui/core/TextField';
import { Button, Typography } from "@material-ui/core";
import axios from 'axios';

const updatePlayer = (values, actions, user) => {
	axios.post(process.env.REACT_APP_API_URL+'/players/'+user.sub,
		values
	)
    .then((response) => {
        actions.setSubmitting(false)
    })
    .catch(function (error) {
    })
    .finally(function () {
    });
}

const getPlayer = (setPlayer, user) => {
	axios.get(process.env.REACT_APP_API_URL+'/players/getPlayer/'+user.sub)
    .then((response) => {
        setPlayer(response.data)
    })
    .catch(function (error) {
    })
    .finally(function () {
    });
}

const Profile = () => {

	const { loading, user } = useAuth0();
	const [player, setPlayer] = useState();

	useEffect(() => {
		if (user !== undefined){
			getPlayer(setPlayer, user)
		}		
    }, [user]);

	if (loading || !user || !player) {
		return (
		<div>Loading...</div>
		);
	}

	return (
		<div style={{display: 'flex', flexDirection: 'column', alignContent:'center'}}>
			<img src={user.picture} alt="Profile" style={{borderRadius: '50%', width:124, margin: 'auto'}} />
			<Typography style={{margin:'auto'}}>{user.email}</Typography>
			<Formik
			initialValues={{
				userName: player.userName,
			}}
			onSubmit={(values, actions) => {
				updatePlayer(values, actions, user)
			}}
			render={({ errors, status, touched, isSubmitting, values, handleChange }) => (
				<Form style={{padding: 8, margin:'auto'}}>
					<div>
						<TextField
							label='User Name'
							name={'userName'}
							value={values.userName}
							onChange={handleChange}
							variant="outlined"
							margin='dense'
						/>
					</div>
					<div>
						<Button type='submit' color='primary' disabled={isSubmitting}>
							Submit
						</Button>
					</div>
				</Form>
			)}
			/>
		</div>
	);
};

	export default Profile;