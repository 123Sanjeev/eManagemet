const appList = [
  {
    app : "QB",
    MenuName: "Question Bank",
    MenuUrl: "#",
    type: "mutli",
    mutiVal :[
      {
        app : "V",
        MenuName: "View Question",
        MenuUrl: "/question/View",
        type: "single",
      },
      {
        app : "I",
        MenuName: "Add Question",
        MenuUrl: "/question/Add",
        type: "single",
      },
    ]
  },
  {
    app : "BP",
    MenuName: "Blueprint",
    MenuUrl: "#",
    type: "multi",
    mutiVal: [
      {
        app : "V",
        MenuName: "View Blue print",
        MenuUrl: "/viewBlueprint",
        type: "single",
      },
      {
        app : "I",
        MenuName: "Create Blue Print",
        MenuUrl: "/createBlueprint",
        type: "single",
      },
    ],
  },{
    app : "QPSET",
    MenuName: "Question paper set",
    MenuUrl: "#",
    type: "multi",
    mutiVal: [
      {
        app : "V",
        MenuName: "View Question paper set",
        MenuUrl: "/viewBlueprint",
        type: "single",
      },
      {
        app : "I",
        MenuName: "Create Question paper set",
        MenuUrl: "/createBlueprint",
        type: "single",
      },
    ],
  },
];

export default appList;
