import { useState } from "react";
import { capabilitiesType, user } from "../compontents/Dashboard";
import { RoleBasedAuthorities } from "./AuthAccess";

type appContxt = {
  appName: string;
  component: string;
  option: string;
};

export function HasCapabilities(user: user) {
  var capabilities: capabilitiesType = {
    authorizedActions: {
      I: false,
      U: false,
      V: false,
      D: false,
    },
    authorizedApps: [""],
  };
  // debugger;
  user.roles.forEach((role) => {
    switch (role.role) {
      case "ADMIN":
        capabilities = {
          authorizedActions: RoleBasedAuthorities["UEB"].authorizedActions,
          authorizedApps: RoleBasedAuthorities["UEB"].authorizedApps,
        };
    }
  });
  console.log(capabilities);
  return capabilities;
}
