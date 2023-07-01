import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { legacy_createStore as createStore, applyMiddleware } from "redux"
import { Provider } from 'react-redux';
import rootReducer, { rootSaga } from './modules'
import logger from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { unstable_HistoryRouter as Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import createSagaMiddleware from 'redux-saga'

const customHistory = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware({
  context: {
    history: customHistory
  }
}) // 사가 미들웨어 만들기

const store = createStore(
  rootReducer, 
  // logger를 사용하는 경우 logger가 가장 마지막에 와야 한다.
  composeWithDevTools(
    applyMiddleware(thunk.withExtraArgument({ history: customHistory }),
    sagaMiddleware,   // 사가 미들웨어 적용
    logger)))
// 여러 개의 미들웨어 적용 가능

sagaMiddleware.run(rootSaga)  // 루트 사가 실행
// 스토어 생성이 된 다음에 실행해야 한다.

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router history={customHistory}>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
