import React from 'react';

import { Providers } from "./src/components";
import { Main } from "./src/main";

const App = (): JSX.Element => {
  return (
    <Providers>
      <Main/>
    </Providers>
  )
};

export default App;
