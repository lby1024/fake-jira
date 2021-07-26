import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { DevTools, loadServer } from "jira-dev-tool";
import 'antd/dist/antd.less';
import './index.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import XProjectForm from 'components/project-form';
import XTaskForm from 'components/task-form';
import XEpicForm from 'pages/epic/epic-form';

const Content: FC = ({children}) => {
  return <QueryClientProvider client={new QueryClient()} >
    <BrowserRouter>
      {children}
      <XProjectForm />
      <XTaskForm />
      <XEpicForm />
    </BrowserRouter>
  </QueryClientProvider>
}

loadServer(() =>
  ReactDOM.render(
    <Content>
      <DevTools />
      <App />
    </Content>,
    document.getElementById("root")
  )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
