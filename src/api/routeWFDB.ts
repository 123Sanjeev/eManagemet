import { backendURL } from "../compontents/globals/global_variable";
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

}
export default new RouteWFDB()