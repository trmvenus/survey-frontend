import { adminRoot } from "./defaultValues";
// import { UserRole } from "../helpers/authHelper"

const data = [
  {
    id: 'dashboard',
    icon: 'iconsminds-shop-4',
    label: 'menu.dashboards',
    to: `${adminRoot}/dashboards`,
    subs: [
      {
        icon: 'simple-icon-briefcase',
        label: 'menu.default',
        to: `${adminRoot}/dashboards/default`,
        // roles: [UserRole.Admin],
      },
    ],
  },
  {
    id: 'surveys',
    icon: 'simple-icon-calculator',
    label: 'menu.surveys',
    to: `${adminRoot}/surveys`,
    subs: [
      {
        icon: 'simple-icon-paper-plane',
        label: 'menu.mysurveys',
        to: `${adminRoot}/surveys/mysurveys`,
      },
    ],
  },
  {
    id: 'settings',
    icon: 'simple-icon-settings',
    label: 'menu.settings',
    to: `${adminRoot} /settings`,
    // roles: [UserRole.Admin, UserRole.Editor],
    subs: [
      {
        icon: 'simple-icon-user',
        label: 'menu.account',
        to: `${adminRoot}/settings/account`,
      },
    ],
  },
];
export default data;
