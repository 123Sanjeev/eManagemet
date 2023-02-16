import { wfResDataType } from "../compontents/Blueprint/UpdateBlueprint";
import { backendURL } from "../compontents/globals/global_variable";
import { assignmentType } from "../pages/Home";
type WFDataType ={
        app: string,
        routedby: string,
        role: string,
        memo: string,
        routedTo : string
 
}
class RouteWFDB{

    async routeWF(wfData:WFDataType){
        const request = await fetch(`${backendURL}wfaction/routewf`,{
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(wfData)
        })
        const response = await request.json()
        return response;
    }
    async getAssignments(userid : number){
        const request = await fetch(`${backendURL}wfaction/getAssignments?userid=${userid}`,{
            method : "GET",
            headers : {
                "Content-Type" : "application/json"
            }
        })
        const response = await request.json()
        return response as assignmentType[]

    }

    async checkWF(currentRecord:string){
        const request = await fetch(`${backendURL}wfaction/checkRecordEntry/${currentRecord}`,{
            method : "GET",
            headers :{
                "Content-Type" : "application/json"
            }
        })
        const response = await request.json()
        return response[0] as wfResDataType
    }

}
export default new RouteWFDB()