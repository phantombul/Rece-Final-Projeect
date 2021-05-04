import React from 'react';
import { Navigator } from './src/navigation';
import { UserProvider } from './src/providers/User';

const App = () => {
  return (
    <UserProvider>
      <Navigator />
    </UserProvider>
  );
};

export default App;
