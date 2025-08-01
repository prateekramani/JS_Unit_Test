const axios = require('axios');
const fetch = require("node-fetch");



async function fetchUsersAxios() {

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: 'https://dummyjson.com/users/2',
        headers: {
            'Authorization': ''
        }
    };

    const data = await axios.request(config)
    console.log(data);
    
    return {
        data: {
            id: data.data.id,
            firstName: data.data.firstName,
            age: data.data.age
         }
}}


async function fetchUsers() {
    console.log("Fetching users from Fetch API");
    let data = await fetch('https://dummyjson.com/users/1')
    let jsonData = await data.json();
    // console.log(jsonData);
    return jsonData;
}


fetchUsersAxios()


module.exports = { fetchUsers , fetchUsersAxios };