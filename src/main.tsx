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

dayjs.extend(localizedFormat);
dayjs.extend(relativeTime);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
