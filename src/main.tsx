import 'react-photo-view/dist/react-photo-view.css';
import 'react-toastify/dist/ReactToastify.css';
import './i18n.ts';
import './index.css';

import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import OneSignal from 'react-onesignal';

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

OneSignal.init({
  appId: 'd20f3977-278e-43c8-981d-772618758358',
  allowLocalhostAsSecureOrigin: true,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
