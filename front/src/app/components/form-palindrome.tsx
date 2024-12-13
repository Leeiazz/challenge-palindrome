'use client';
import { ChangeEvent, FormEvent, useState } from 'react';
import LoadingIcon from '../icons/LoadingIcon';
import { useRouter } from 'next/navigation';

export default function FormPalindrome() {
  const [inputValue, setinputValue] = useState<string>(
    `A mamá Roma le aviva el amor a papá y a papá Roma le aviva el amor a mamá`
  );
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setinputValue(event.target.value);
  };

  const verifyPalindrome = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    console.log(inputValue);
    const response = await fetch('http://localhost:3000/verify-palindrome', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: inputValue }),
    });
    const data = await response.json();
    setLoading(false);
    console.log(data);
    setinputValue('');
    // Se actualiza la página para que se muestre el nuevo registro ya que al iniciar el componente Historical se realiza la petición HTTP
    router.refresh();
  };
  return (
    <form onSubmit={verifyPalindrome} className='mx-auto w-96'>
      <div className='mb-5'>
        <label
          htmlFor='input-palindrome'
          className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
        >
          Texto a evaluar
        </label>
        <input
          type='text'
          id='input-palindrome'
          value={inputValue}
          onChange={handleChangeInput}
          className='bg-lead-700 px-4 py-2 w-full rounded-lg transition-all duration-300 outline-none focus:bg-lead-600 focus:outline-1 focus:outline-lead-100/20'
          placeholder='Escribe aqui...'
          required
        />
      </div>

      <button
        type='submit'
        className='text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 inline-flex items-center
        disabled:cursor-not-allowed disabled:bg-gray-600 disabled:hover:bg-gray-600'
      >
        {loading && <LoadingIcon></LoadingIcon>}
        {loading ? 'Verificando...' : 'Verificar'}
      </button>
    </form>
  );
}
