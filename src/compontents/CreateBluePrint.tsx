import "../sytles/createBlueprint.css"
import $ from 'jquery'
import { useState } from "react";
import { backendURL } from "./globals/global_variable";

export default function CreateBluePrint(){

    const [selectedOption , setSelectedOption] = useState("");
    const [popUpValue, setPopUpValue] = useState(0);

    return (
        <div>
               <div id="loading" className="loader"></div>
            <div>{(popUpValue > 0) ? <div className="popupcontainer"> <div className="popup"> {popUp(popUpValue)} <button onClick={()=>{
                setSelectedOption("")
                setPopUpValue(0)
                const totalMarksSelectionbox = document.getElementById('totalMarks')
                if(totalMarksSelectionbox?.classList.contains('selected')){
                    totalMarksSelectionbox?.classList.remove('selected')
                }
                document.forms[0]?.reset()
            }} className="btn btn-danger">Close</button></div> </div>: <></>}</div>
            <form method="POST" id="marksPage" className="from-page form">
                <div className="form-group">
                    <label htmlFor="location">
                        Location:
                    </label>
                    <input type="text" name="location" id="location" value={'9TS'} className="form-control bg-light" readOnly />
                </div>
                <div className="form-group">
                    <label htmlFor="mastercoursename">
                        Master Course name:
                    </label>
                    <input type="text" name="mastercoursename" id="mastercoursename" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="subject">
                        Subject:
                    </label>
                    <input type="text" name="subject" id="Subject" className="form-control" />
                </div>
                <div className="form-group">
                    <label htmlFor="term">
                        Term:
                    </label>
                    <input type="text" name="term" id="term" className="form-control" />
                </div>
                
                <div className="form-group">
                    <label htmlFor="title">
                        Title:
                    </label>
                    <input type="text" name="bptitle" id="title" className="form-control" />
                </div>

                <div className="form-group">
                    <label htmlFor="TotalMarks">
                        Option:
                    </label>
                    <select name="option" id="option" className="form-control" onChange={(e)=>{
                            setSelectedOption(e.target.value)
                            const totalMarksSelectionbox = document.getElementById('totalMarks')
                            if(totalMarksSelectionbox?.classList.contains('selected')){
                                return
                            }
                            totalMarksSelectionbox?.classList.add('selected')
                        }}>
                        <option value="">--Select--</option>
                        <option value="Objective">Objective</option>
                        <option value="Subjective">Subjective</option>
                        <option value="Both">Both</option>
                    </select>
                    
                </div>
                {
                    optionComponent(selectedOption)
                }
              
                <div id="totalMarks" style={{display:'none'}}>
                    <label htmlFor="totalmarks">Total Marks</label>
                    <input type="number" name="totalmarks" id="totalmarks" className="form-control" />
                </div>

                <div className="form-group nextbtn">
                    <button className="btn btn-primary" onClick={(e)=> {

                            processSubmitForm(e).then(data=> setPopUpValue(data))
                          
                            
                        } }>Next</button>
                </div>
            </form>
        </div>
    );


}


function optionComponent(option:string){

if(option === "Subjective"){
    return (<>
        <div className="Subjective marks" id="Subjective">
            <div className="form-group"><label htmlFor="FIB">FIB:<input type="number"  className="form-control" name="FIB" id="FIB" /></label></div>
            <div className="form-group"><label htmlFor="VSA">VSA:<input type="number" className="form-control" name="VSA" id="VSA" /></label></div>
            <div className="form-group"><label htmlFor="LA">LA:<input type="number"  className="form-control" name="LA" id="LA" /></label></div>
            <div className="form-group"><label htmlFor="SA">SA<input type="number"  className="form-control" name="SA" id="SA" /></label></div>
        </div>
        </>)
}else if(option === "Objective"){
return(<>
    <div className="Objective marks" id="Objective">
        <div className="form-group"><label htmlFor="FIB">FIB:<input type="number"  className="form-control" name="FIB" id="FIB" /></label></div>
        <div className="form-group"><label htmlFor="MCQ">MCQ:<input type="number"  className="form-control" name="MCQ" id="MCQ" /></label></div>
        <div className="form-group"><label htmlFor="T/F">T/F:<input type="number" className="form-control"  name="TF" id="TF" /></label></div>                </div>
    
    </>)
}else if(option === "Both"){
    return(<>
    <div className="Both marks" id="Both">
        <div className="form-group"><label htmlFor="FIB">FIB:<input type="number"  className="form-control" name="FIBOBJ" id="FIBOBJ" /></label></div>
        <div className="form-group"><label htmlFor="VSA">VSA:<input type="number"  className="form-control" name="VSA" id="VSA" /></label></div>
        <div className="form-group"><label htmlFor="LA">LA:<input type="number"  className="form-control" name="LA" id="LA" /></label></div>
        <div className="form-group"><label htmlFor="SA">SA<input type="number"  className="form-control" name="SA" id="SA" /></label></div>
        <div className="form-group"><label htmlFor="FIB">FIB:<input type="number"  className="form-control" name="FIBSUB" id="FIBSUB" /></label></div>
        <div className="form-group"><label htmlFor="MCQ">MCQ:<input type="number"  className="form-control" name="MCQ" id="MCQ" /></label></div>
        <div className="form-group"><label htmlFor="T/F">T/F:<input type="number" className="form-control"  name="TF" id="TF" /></label></div>      
    </div>
    </>)
}else{
    return (<></>);
}


}

async function processSubmitForm(e:any){
    e.preventDefault()
   
    const form = document.forms[0];


    console.log(form?.option.value);

    
    var marksArray:any[] = [];
    if(form?.option.value ==="Objective"){
        marksArray = [parseFloat(form?.FIB.value),parseFloat(form?.MCQ.value),parseFloat(form?.TF.value)]
    }else if(form?.option.value ==="Subjective"){
        marksArray = [parseFloat(form?.FIB.value),parseFloat(form?.VSA.value),parseFloat(form?.SA.value),parseFloat(form?.LA.value)]
    }else if(form?.option.value ==="Both"){
        marksArray = [parseFloat(form?.FIBOBJ.value),parseFloat(form?.VSA.value),parseFloat(form?.SA.value),parseFloat(form?.LA.value),parseFloat(form?.FIBSUB.value),parseFloat(form?.MCQ.value),parseFloat(form?.TF.values)]
    }

    marksArray.forEach((e:number,idx) =>{
        if(Number.isNaN(e)){
            marksArray[idx] = 0.0
        }
    })


    const formDataObject = {
        "title" : form?.bptitle.value,
        "location" : form?.location.value,
        "mastercoursename" : form?.mastercoursename.value,
        "subject" : form?.subject.value,
        "term" : form?.term.value,
        "option" : form?.option.value,
        "marks" : marksArray,
        "totalmarks" : parseFloat(form?.totalmarks.value)
    }
    let result 
    try{
      
        result =  await $.ajax({
            type : "POST",
            url :   `${backendURL}blueprint/create`,
            data : JSON.stringify(formDataObject),
            headers :{
                'Content-Type' : 'application/json',
            },
            beforeSend : function (){
                $('#loading').show()
            },
            complete: function(){
                $('#loading').hide()
            }
        })
        console.log(result)
    }catch(error){
        console.error(error)
    }
    
    return result
}

function popUp(popUpValue:number){
if(popUpValue > 0){
    return (<div id="popup">

        Blue Print created with id {popUpValue} successfully.

    </div>)  
}else{
    return (<></>)
}
  

}