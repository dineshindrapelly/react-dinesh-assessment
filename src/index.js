import React from 'react';
import ReactDOM from 'react-dom';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { createClient, defaultExchanges, Provider,  subscriptionExchange } from 'urql';
import MainApp from './MainApp';

const clientSub = new SubscriptionClient('wss://react.eogresources.com/graphql', {
  reconnect: true,
});

const newClient = createClient({
  url: 'https://react.eogresources.com/graphql',
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: operation => clientSub.request(operation),
    }),
  ],
});

ReactDOM.render(
  <Provider value={newClient}>
    <MainApp />
  </Provider>,
  document.getElementById('root'),
);
