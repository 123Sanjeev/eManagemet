const appList = [
  {
    MenuName: "Home",
    MenuUrl: "/",
    type: "single",
  },
  {
    MenuName: "About",
    MenuUrl: "/About",
    type: "single",
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
  {
    MenuName: "Blueprint",
    MenuUrl: "#",
    type: "multi",
    mutiVal: [
      {
        MenuName: "View Blue print",
        MenuUrl: "/viewBlueprint",
        type: "multi",
        mutiVal: [
          {
            MenuName: "Testing demo",
            MenuUrl: "/viewBlueprint",
            type: "single",
          },
        ],
      }],
          },
        {
          MenuName: "Publish Set",
    MenuUrl: "/publishSet",
        type: "multi",
        mutiVal: [
          {
            MenuName: "Testing demo",
            MenuUrl: "/viewBlueprint",
            type: "single",
          },
        ],
      },

];

export default appList;
