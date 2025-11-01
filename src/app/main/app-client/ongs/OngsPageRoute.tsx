import authRoles from '../../../auth/authRoles';
import type { AppRoute } from '../../../routes/types';
import OngsPage from './OngsPage';

const OngsPageRoute: AppRoute = {
  path: '/ongs',
  element: <OngsPage />,
  settings: {
    layout: { config: { navbar: true, toolbar: false, footer: false } },
  },
  auth: authRoles.admin,
};

export default OngsPageRoute;