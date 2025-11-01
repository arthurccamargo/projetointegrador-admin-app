import authRoles from '../../../auth/authRoles';
import type { AppRoute } from '../../../routes/types';
import VolunteersPage from './VolunteersPage';

const VolunteersPageRoute: AppRoute = {
  path: '/volunteers',
  element: <VolunteersPage />,
  settings: {
    layout: { config: { navbar: true, toolbar: false, footer: false } },
  },
  auth: authRoles.admin,
};

export default VolunteersPageRoute;