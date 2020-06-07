import React from 'react';
import { TestResult } from './Service';

function resultToString(result?: boolean) {
  if (result == null) {
    return '';
  }
  return result ? 'Połączone' : 'Niepołączone';
}

const TestResultItem: React.FC<{ data?: TestResult; }> = ({ data }) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Nr testu</th>
            <th>Wierzchołek początkowy</th>
            <th>Wierzchołek końcowy</th>
            <th>Wynik</th>
            <th>Czas trwania [s]</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data?.id}</td>
            <td>{data?.from}</td>
            <td>{data?.to}</td>
            <td>{Array.isArray(data?.result) ? data?.result?.join(', ') : resultToString(data?.result)}</td>
            <td>{data?.duration?.toFixed(7)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TestResultItem;