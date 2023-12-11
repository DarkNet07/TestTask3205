import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InputMask from 'react-input-mask';

type FormData = {
  email: string;
  number?: string;
};

export default function SearchForm(): JSX.Element {
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [user, setUser] = useState<FormData | null>(null);
  const [result, setResult] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    try {
      const data: FormData = { email, number };
      setResult(false);
      const response = await axios.post('http://localhost:3001/search', data);
      setUser(response.data);
      setResult(true);
    } catch (error) {
      console.error(error.response?.data?.error);
    }
  };

  useEffect(() => {}, [user]);

  return (
    <div className="container">
      <form className="container flex flex-col gap-5" onSubmit={handleSubmit}>
        <label
          className="inline-block align-middle text-sm font-medium leading-6 text-gray-900 gap-5 text-center"
          htmlFor="email"
        >
          E-mail
          <input
            className=" ml-5 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            type="email"
            placeholder="E-mail"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label
          className="inline-block align-middle gap-5 block text-sm font-medium leading-6 text-gray-900"
          htmlFor="number"
        >
          Номер
          <InputMask
            className=" ml-5 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            mask="99-99-99"
            pattern="[0-9]*"
            maskChar=""
            placeholder="Номер"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </label>
        <button type="submit">Поиск</button>
      </form>
      {result ? (
        <div className="container mt-10 block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
          {user ? (
            <div className="container ">
              <h3 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                Пользователь нашелся😎👌🔥:
              </h3>
              <p>
                <strong>E-mail: </strong>
                {user?.email}
              </p>
              <p>
                <strong>Номер: </strong>
                {user?.number}
              </p>
            </div>
          ) : (
            <h3>Пользователь не нашелся🥺</h3>
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  );
}
