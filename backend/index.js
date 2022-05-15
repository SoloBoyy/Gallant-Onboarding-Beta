const express = require('express');
const cors = require('cors');
const knex = require('knex');
axios = require('axios');
require('dotenv').config();

const db = knex({
    client: 'pg',
    connection: {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE,
    },
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CORS implemented so that we don't get errors when trying to access the server from a different server location
app.use(cors());

// GET: Fetch all movies from the database
app.get('/', (req, res) => {
    db.select('*')
        .from('merchants')
        .then((data) => {
            console.log(data);
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
        });
});
app.post('/add-merchant', (req, res) => {
    const { name, email, lname, bio, city, hourly, number, role, skills, state } = req.body;
  
    db('merchants')
        .insert({
            email: email,
            name: name,
            lname: lname,
            bio: bio,
            city: city,
            hourly: hourly,
            number: number,
            role: role,
            skills: skills,
            state: state,
        })
        .then(() => {
            console.log('Merchant Added');
            return res.json({ msg: 'Merchant Added' });
        })
        .catch((err) => {
            console.log(err);
        });
});

// GET: Fetch all movies from the database
app.get('/online/harperdb', (req, res) => {
    const data = { operation: 'sql', sql: 'SELECT * FROM dev.merchants' };

    const config = {
        method: 'post',
        url: process.env.HARPERDB_URL,
        headers: {
            Authorization: `Basic ${process.env.HARPERDB_AUTH}`,
            'Content-Type': 'application/json',
        },
        data: data,
    };
    const axios = require('axios');
    axios(config)
        .then((response) => {
            const data = response.data;
            console.log(data);
            res.json(data);
        })
        .catch((error) => {
            console.log(error);
        });
});

// POST: Create movies and add them to the database
app.post('/online/harperdb/add-merchant', (req, res) => {
    const { name, email, lname, bio, city, hourly, number, role, skills, state, imgurl, resume } = req.body;
    console.log(req.body);

    const data = {
        operation: 'insert',
        schema: 'dev',
        table: 'merchants',
        records: [
            {
                email: email,
                name: name,
                lname: lname,
                bio: bio,
                city: city,
                hourly: hourly,
                number: number,
                role: role,
                skills: skills,
                state: state,
                imgurl: imgurl,
                resume: resume,
            },
        ],
    };
    
    const config = {
        method: 'post',
        url: process.env.HARPERDB_URL,
        headers: {
            Authorization: `Basic ${process.env.HARPERDB_AUTH}`,
            'Content-Type': 'application/json',
        },
        data: data,
    };

    axios(config)
        .then((response) => {
            const data = response.data;
            //console.log(data);
            res.json(data);
        })
        .catch((error) => {
            console.log(error);
        });
});




const port = process.env.PORT || 2000;

app.listen(port, () => console.log(`Server running on port ${port}, http://localhost:${port}`));