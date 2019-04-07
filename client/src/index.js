import React from 'react';
import ReactDOM from 'react-dom';

// Router: 이 컴포넌트는 react-router 의 주요 컴포넌트로서, 라우터의 속성을 정의하고 이 내부에서 라우트 설정을 합니다.
// Route: 이 컴포넌트는 우리가 설정한 경로에서 어떤 컴포넌트를 렌더링 할 지 정하는 컴포넌트 입니다. 이 라우트 컴포넌트의 자식에 또 다른 Route 컴포넌트를 넣으면 해당 자식 컴포넌트는 부모 라우트의 서브 라우트가 됩니다.
// IndexRoute: 라우트에서 서브라우트가 주어지지 않았을 때, 즉 특정 라우트의 / 경로로 들어 왔을 때, 이 라우트에서 지정한 컴포넌트를 보여줍니다.
// browserHistory: HTML5 의 History API 를 사용하여 브라우저의 URL 변화를 주시하고, 조작합니다.

import './index.css';

import * as serviceWorker from './serviceWorker';
import {MuiThemeProvider,createMuiTheme} from '@material-ui/core/styles'

import App from './App';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducer/idex';
import thunk from 'redux-thunk';


const store = createStore(reducers,applyMiddleware(thunk));
const theme = createMuiTheme({
    
        palette: {
          primary: {
            main: '#fafafa',
          },
          secondary: {
            main: '#212121',
          },
        },
      
    typography:{
        fontFamily : '"Noto Sans KR",serif'
    }
})
// 13번 줄에서는 Router 컴포넌트를 정의하고 history 값을 browserHistory 로 설정 했습니다. history 는 브라우저의 주소창이 어떻게 바뀌는지 주시하고 주소를 라우터에서 인식할 수 있도록 location 객체로 파싱을 해줍니다.
ReactDOM.render(
<MuiThemeProvider theme={theme}>
<Provider store={store}>
<App/>
</Provider>
</MuiThemeProvider>
, document.getElementById('root')

);

serviceWorker.unregister();
