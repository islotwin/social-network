import React, { useCallback, useState } from 'react';
import './App.css';
import Form from './Form';
import { Service, TestResult } from './Service';
import TestResultItem from './TestResults';

function App() {
  const [data, setData] = useState<TestResult>();
  const [loading, setLoading] = useState(false);
  const checkIfConnected = useCallback(async (from: string, to: string) => {
    setLoading(true);
    const res = await Service.getInstance().areNodesConnected(from, to);
    setData(res);
    setLoading(false);
  }, []);
  const findPath = useCallback(async (from: string, to: string) => {
    setLoading(true);
    const res = await Service.getInstance().getPath(from, to);
    setData(res);
    setLoading(false);
  }, []);
  return (
    <div className="App">
      <div className="column">
        <Form checkIfConnected={checkIfConnected} findPath={findPath} loading={loading} />
      </div>
      <div className="column">
        {<TestResultItem data={data} />}
      </div>
    </div>
  );
}

export default App;
