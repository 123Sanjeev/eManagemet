const appList = [
  {
    MenuName: "Question Bank",
    MenuUrl: "#",
    type: "mutli",
    mutiVal :[
      {
        MenuName: "View Question",
        MenuUrl: "/question/view",
        type: "single",
      },
      {
        MenuName: "Add Question",
        MenuUrl: "/question/add",
        type: "single",
      },
     
    ]
  },
  {
    MenuName: "Blueprint",
    MenuUrl: "#",
    type: "multi",
    mutiVal: [
      {
        MenuName: "View Blue print",
        MenuUrl: "/viewBlueprint",
        type: "single",
      },
      {
        MenuName: "Create Blue Print",
        MenuUrl: "/createBlueprint",
        type: "single",
      },
    ],
  },
];

export default appList;
