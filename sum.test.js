const {sum , substract, promiseReturningFunction} = require('./sum.js');

sum(1, 2); // This should return 3

beforeAll(()=>{
    console.log("This is before all tests");
})

beforeEach(()=>{
    console.log("This is before each test");
})

afterAll(()=>{
    console.log("This is after all tests");
})

afterEach(()=>{
    console.log("This is after each test");
})


describe("Sum functions", () => {
    test("This is for testing the sum function", () => {
        expect(()=> sum(1, 2).toBe(3));
    })
})



describe("Tests for Promise returning functions" , ()=>{
    test("test promise returning function", async ()=>{
        let result = await promiseReturningFunction();
        expect(result).toBe("This is a promise")
})})



describe("Sum functions - Negative Test", () => {
    test("false test case", () => {
        expect(sum(1, 2)).not.toBe(4);
    })
})


describe("Substract functions negative test", ()=>{
    test("Substract function with more than 2 arguments", ()=>{
        expect(() => substract(5, 3, 1)).toThrow("substract function requires exactly two arguments");
        expect(substract(5, 3)).not.toBeUndefined();
        expect(substract(5, 3)).toBe(2);

        
    })
})


describe("check undefined", () => {
    let a = undefined;
    test("check undefined", () => {
        expect(a).toBeUndefined();
        expect(a).not.toBeDefined();
        expect(a).toBeFalsy();
        expect(a).not.toBeTruthy();
    })

    it("test number as zero", () => {
        expect(0).toBeFalsy();
        expect(0).toBeDefined();
        expect(0).not.toBeNull();
        expect(0).not.toBeTruthy();
    })

    it("test greater/less than", () => {
        expect(0).toBeGreaterThan(-1);
        expect(0).not.toBeLessThan(-1);
    })


    it("String matcher", () => {
        expect("Hello World").toMatch(/ello/);
        expect("Hello World").not.toMatch(/hello/);
    })

    it("Test arrays", () => {
        const arr = ["a", "b", "c"]
        console.log(arr);
        expect(arr).toContain("a");
        expect(arr).not.toContain("A");
    })

    it("Test objects", () => {
        const obj = { name: "John", age: 30 };
        expect(obj).toHaveProperty("name");
        expect(obj).not.toHaveProperty("test");
        expect(obj).toEqual({ name: "John", age: 30 });

        expect(obj).toEqual(expect.objectContaining({
            name: expect.any(String),
            age: expect.any(Number)
        }))
    })

    it("Tests Array", () => {
        const arr = [1, 2, 3]
        expect(arr).toEqual(expect.arrayContaining([1, 2]));
    })


    it("Tests array of objects", () => {
        const arr = [{ "name": "Prateek", "age": 30 }, { "name": "John", "age": 25 }];
        expect(arr).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    name : expect.any(String),
                    age: expect.any(Number)
                })
            ])
        )
    })


})