import ReactOnRails from 'react-on-rails';

import AppRouter from '../bundles/Appointments/components/AppRouter';

// This is how react_on_rails can see the AppRouter in the browser.
ReactOnRails.register({
  AppRouter,
});
