import { adminRoot } from "./defaultValues";
import { UserRole } from "../helpers/authHelper"

const data = [
  {
    id: 'dashboard',
    icon: 'iconsminds-shop-4',
    label: 'menu.dashboards',
    to: `${adminRoot}/dashboards`,
    subs: [
      {
        icon: 'simple-icon-briefcase',
        label: 'menu.mydashboard',
        to: `${adminRoot}/dashboards/mydashboard`,
      },
      {
        icon: 'simple-icon-briefcase',
        label: 'menu.websitedashboard',
        to: `${adminRoot}/dashboards/websitedashboard`,
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
        id: 'mysurveys',
        icon: 'simple-icon-paper-plane',
        label: 'menu.mysurveys',
        to: `${adminRoot}/surveys/mysurveys`,
      },
      {
        id: 'mysurveys',
        icon: 'simple-icon-share-alt',
        label: 'menu.sharedsurveys',
        to: `${adminRoot}/surveys/sharedsurveys`,
      },
      {
        id: 'allsurveys',
        icon: 'simple-icon-list',
        label: 'menu.allsurveys',
        to: `${adminRoot}/surveys/all`,
        roles: [UserRole.Admin],
      },
      {
        id: 'mysurveys-parent',
        icon: 'simple-icon-layers',
        label: 'menu.mysurveys',
        to: `${adminRoot}/surveys`,
        subs: [
        ],
      },
      {
        id: 'allsurveys-parent',
        icon: 'simple-icon-layers',
        label: 'menu.allsurveys',
        to: `${adminRoot}/surveys`,
        subs: [
        ],
      },
    ],
  },
  {
    id: 'settings',
    icon: 'simple-icon-settings',
    label: 'menu.settings',
    to: `${adminRoot}/settings`,
    subs: [
      {
        icon: 'simple-icon-user',
        label: 'menu.profile',
        to: `${adminRoot}/settings/profile`,
      },
      {
        icon: 'simple-icon-key',
        label: 'menu.security',
        to: `${adminRoot}/settings/security`,
      },
    ],
  },
  {
    id: 'admin',
    icon: 'iconsminds-administrator',
    label: 'menu.admin',
    to: `${adminRoot}/admin`,
    roles: [UserRole.Admin],
    subs: [
      {
        icon: 'simple-icon-people',
        label: 'menu.users',
        to: `${adminRoot}/admin/users`,
      },
      {
        icon: 'simple-icon-organization',
        label: 'menu.organizations',
        to: `${adminRoot}/admin/organizations`,
      },
    ],
  },
];
export default data;
