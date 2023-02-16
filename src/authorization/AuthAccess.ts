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
  CO : {
    description: string;
    authorizedApps: string[];
    authorizedActions: {
        I: boolean,
        U: boolean,
        V: boolean,
        D: boolean,
    };
  };
  CI : {
    description: string;
    authorizedApps: string[];
    authorizedActions: {
        I: boolean,
        U: boolean,
        V: boolean,
        D: boolean,
    };
  };
  ALL : {
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
    authorizedApps: ["QB","BP"],
    authorizedActions: {
      I: true,
      U: true,
      V: true,
      D: true,
    },
  },
  CO: {
    description: "",
    authorizedApps: ["QB","BP"],
    authorizedActions: {
      I: true,
      U: true,
      V: true,
      D: true,
    },
  },
  CI: {
    description: "",
    authorizedApps: ["QB","BP"],
    authorizedActions: {
      I: true,
      U: true,
      V: true,
      D: true,
    },
  },
  ALL: {
    description: "",
    authorizedApps: ["QB"],
    authorizedActions: {
      I: true,
      U: true,
      V: true,
      D: true,
    },
  },
};
