export type RoleAuthType = {
  UEB : {
    description: string;
    authorizedApps: string[];
    authorizedActions: {
        I: boolean,
        U: boolean,
        V: boolean,
        D: boolean,
    };
  };
};

export const RoleBasedAuthorities: RoleAuthType = {
  UEB: {
    description: "",
    authorizedApps: ["QB", "BP"],
    authorizedActions: {
      I: true,
      U: true,
      V: true,
      D: true,
    },
  },
};
