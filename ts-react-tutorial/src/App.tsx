import React from 'react';
import ReducerSample from './ReducerSample';
import { SampleProvider } from './SampleContext';

function App() {
  return (
    <SampleProvider>
      <ReducerSample/>
    </SampleProvider>
  )
}

export default App;
