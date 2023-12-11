import { useState } from 'react';
import './App.css';
import SearchForm from './features/SearchForm';

function App(): JSX.Element {
  return (
    <div className="container">
      <SearchForm />
    </div>
  );
}

export default App;


