import React, { Fragment, useState, useEffect } from 'react';
import './App.css';

const App = () => {
    useEffect(() => {
        const getAPI = () => {
            // Change this endpoint to whatever local or online address you have
            // Local PostgreSQL Database
            const API = 'http://127.0.0.1:2000/';

            fetch(API)
                .then((response) => {
                    console.log(response);
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                    setLoading(false);
                    setApiData(data);
                });
        };
        getAPI();
    }, []);
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(true);
    return (
        <Fragment>
            <header>
                <h1>Gallant Application</h1>
            </header>
            <div className="form-container">
                <h2>Apply Now!</h2>
                <form method="POST" action="http://127.0.0.1:2000/online/harperdb/add-merchant">
                    <div>
                        <label>First Name</label>
                        <input type="text" name="name" required />
                    </div>
                    <div>
                        <label>Last Name</label>
                        <input type="text" name="lname" required />
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="text" name="email" required />
                    </div>
                    <div>
                        <label>Profile Picture</label>
                        <input type="text" name="imgurl" required />
                    </div>
                    <div>
                        <label>About Yourself</label>
                        <input type="text" name="bio" required />
                    </div>
                    <div>
                        <label>City</label>
                        <input type="text" name="city" required />
                    </div>
                    <div>
                        <label>State</label>
                        <input type="text" name="state" required />
                    </div>
                    <div>
                        <label>Hourly Rate</label>
                        <input type="text" name="hourly" required />
                    </div>
                    <div>
                        <label>Mobile Number</label>
                        <input type="text" name="number" required />
                    </div>
                    <div>
                        <label>Role</label>
                        <input type="text" name="role" required />
                    </div>
                    <div>
                        <label>Skills</label>
                        <input type="text" name="skills" required />
                    </div>
                    <div>
                        <label>Resume</label>
                        <input type="text" name="resume" required />
                    </div>
                    <div>
                        <button type="submit">Submit Application</button>
                    </div>
                </form>
            </div>
        </Fragment>
    );
};

export default App;