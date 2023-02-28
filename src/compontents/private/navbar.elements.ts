import { IconType } from "react-icons";
import { FaBookOpen , FaBoxes , FaEye, FaPen, FaMap} from  "react-icons/fa";

export type  appTypeList = {
  app : string,
  MenuName : string,
  MenuUrl : string,
  type : string,
  icon: IconType,
  mutiVal?: appTypeList[]
}


const appList : appTypeList[]= [
  {
    app : "QB",
    MenuName: "Question Bank",
    MenuUrl: "#",
    type: "mutli",
    icon : FaBookOpen as IconType,
    mutiVal :[
      {
        app : "V",
        MenuName: "View Question",
        MenuUrl: "/question/View",
        type: "single",
         icon : FaEye  as IconType,
      },
      {
        app : "I",
        MenuName: "Add Question",
        MenuUrl: "/question/Add",
        type: "single",
         icon : FaPen as IconType,
      },
    ]
  },
  {
    app : "BP",
    MenuName: "Blueprint",
    MenuUrl: "#",
    type: "multi",
     icon : FaMap as IconType,
    mutiVal: [
      {
        app : "V",
        MenuName: "View Blue print",
        MenuUrl: "/viewBlueprint",
        type: "single",
         icon : FaEye as IconType,
      },
      {
        app : "I",
        MenuName: "Create Blue Print",
        MenuUrl: "/createBlueprint",
        type: "single",
         icon : FaPen as IconType,
      },
    ],
  },{
    app : "QPSET",
    MenuName: "Question paper set",
    MenuUrl: "#",
    type: "multi",
     icon : FaBookOpen as IconType,
    mutiVal: [
      {
        app : "V",
        MenuName: "View Question paper set",
        MenuUrl: "/viewBlueprint",
        type: "single",
         icon : FaEye as IconType,
      },
      {
        app : "I",
        MenuName: "Create Question paper set",
        MenuUrl: "/createBlueprint",
        type: "single",
         icon : FaPen as IconType,
      },
    ],
  },
];

export default appList;
