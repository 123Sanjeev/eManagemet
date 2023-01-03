type registerType = {
  userId : number,
  username :string,
  password : string,
  location : string
}

class db {


  BASE_URL = 'http://localhost:8080/eManagement'

  findOne(table:string){
    return "";
  }

  findUsingQuery(table:string, params:string[]){
  }

  async login(data:{userId :number, password:string, loginkey:string}){

    console.log(data);

    const loginResponse = await fetch('http://localhost:8080/eManagement/user/login',{
        method : "POST",
        headers : {
          "Content-Type" :"application/json"
        },
        body : JSON.stringify(data)
    })

    return await loginResponse.json()
  }

  async register(formdata : registerType){

    const res = await fetch(`${this.BASE_URL}/user/register/${formdata.userId}`,{
      method : "POST",
      headers : {
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(formdata)
    })

    return await res.json();

  }
  async registerInit(){
    const response  = await fetch(`${this.BASE_URL}/user/register`)
    return await response.text()
  }
}
export default  new db();