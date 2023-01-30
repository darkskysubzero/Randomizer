import React, { useState, useEffect } from 'react'
import { useGetUsersQuery } from './services/users'
import { FadeLoader } from 'react-spinners';
import { TextField, Button } from '@mui/material';

const App = () => {

    const [person, setPerson] = useState(null);
    const [loaded, setLoaded] = useState(false);

    const { data, isLoading, isFetching, refetch } = useGetUsersQuery();


    useEffect(() => {
        if (data) {
            //provides result from data (single array of object)
            const randomPerson = data.results[0];
            setPerson(randomPerson);
            setLoaded(true);
        }
    }, [data])

    return (
        <div>
            {(isLoading || isFetching) &&
                <FadeLoader
                    cssOverride={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%,-50%)"
                    }}
                    color='#ffffff'
                    size={100} />
            }

            {loaded && <div className="info">
                <h1>Randomizer</h1>
                <div className="image"><img src={person.picture.large || "https://via.placeholder.com/150"} /></div>
                <TextField
                    defaultValue={person.name.first}
                    id='firstname'
                    label="First Name"
                    InputProps={{ readOnly: true }} />
                <TextField
                    defaultValue={person.name.last}
                    id='lastname'
                    label="Last Name"
                    InputProps={{ readOnly: true }} />
                <TextField
                    defaultValue={person.login.username}
                    id='username'
                    label="Username"
                    InputProps={{ readOnly: true }} />
                <TextField
                    defaultValue={person.email}
                    id='email'
                    label="Email"
                    InputProps={{ readOnly: true }} />
                <TextField
                    defaultValue={person.login.password}
                    id='password'
                    label="Password"
                    InputProps={{ readOnly: true }} />
                <Button variant='contained' onClick={() => {
                    refetch();
                    setLoaded(false);
                }}>Generate</Button>
                <p>Will add more functionality later...</p>
            </div>}

        </div>
    )
}

export default App;