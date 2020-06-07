import React, { useState } from 'react';

type FormProps = {
  checkIfConnected: (from: string, to: string) => void;
  findPath: (from: string, to: string) => void;
  loading: boolean;
};

const Form: React.FC<FormProps> = ({ checkIfConnected, findPath, loading }) => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const onConnectedButtonClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    checkIfConnected(from, to);
  };
  const onPathButtonClick = () => {
    findPath(from, to);
  };
  const onFromChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFrom(event.target.value);
  };
  const onToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTo(event.target.value);
  };

  const disabled = loading || !from || !to;
  return (
    <form>
      <div className='field'>
        <label>Wybierz wierzchołek początkowy</label>
        <input name='from' value={from} onChange={onFromChange} />
      </div>
      <div className='field'>
        <label>Wybierz wierzchołek końcowy</label>
        <input name='to' value={to} onChange={onToChange} />
      </div>
      <div className='row'>
        <button onClick={onConnectedButtonClick} disabled={disabled}>Testuj</button>
        <button type='button' onClick={onPathButtonClick} disabled={disabled}>Znajdź ścieżkę</button>
      </div>
    </form>
  );
};

export default Form;