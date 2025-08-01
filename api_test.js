const axios  = require("axios")
// const mockAxios = require("axios");

const {fetchUsersAxios} = require('./api.js');
jest.mock('axios');


 

describe("test API response", ()=>{

    test("fetch data", async()=>{
        data = await fetchUsersAxios();
        expect(data).toEqual(
            { data: { id: 2, firstName: 'Michael', age: 35 } }
        );
    })

    test("fetch users" ,async ()=>{
        const userData = {
            data: {
                id: 2,
                firstName: "John Doe sent",
                age: 30,
            }
        };
        console.log("Mocking data")
        // axios.get.mockResolvedValue(userData);
        // axios.get = jest.fn(() => userData);
        axios.get.mockResolvedValue({ data: { id: 1, name: 'John' } });
        
        const response = await fetchUsersAxios();
        expect(response).toEqual(userData);

    })
})
