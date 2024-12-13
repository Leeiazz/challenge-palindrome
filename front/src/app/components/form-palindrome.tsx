'use client';
import { ChangeEvent, FormEvent, useState } from 'react';
import LoadingIcon from '../icons/LoadingIcon';
import { useRouter } from 'next/navigation';

export default function FormPalindrome() {
  const [inputValue, setinputValue] = useState<string>(
    `A mamá Roma le aviva el amor a papá y a papá Roma le aviva el amor a mamá`
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<{
    show: boolean;
    isPalindrome: boolean;
    message: string;
  }>({
    show: false,
    isPalindrome: false,
    message: '',
  });
  const router = useRouter();

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setinputValue(event.target.value);
  };

  const viewAlert = (isPalindrome: boolean, message: string) => {
    setAlert({ show: true, isPalindrome, message });
    setTimeout(() => {
      setAlert({ show: false, isPalindrome, message });
    }, 3000);
  };

  const verifyPalindrome = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const response = await fetch('http://localhost:3000/verify-palindrome', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: inputValue }),
    });
    const data = await response.json();
    setLoading(false);
    console.log(data);
    setinputValue('');
    viewAlert(data.isPalindrome, data.message);
    // Se actualiza la página para que se muestre el nuevo registro ya que al iniciar el componente Historical se realiza la petición HTTP
    router.refresh();
  };
  return (
    <div className='mt-10'>
      {alert.show && (
        <div
          className={`px-10 py-2 mb-5 text-center rounded-lg ${
            alert.isPalindrome
              ? 'text-green-100 bg-green-900'
              : 'text-red-100 bg-red-900'
          }`}
        >
          {alert.message}
        </div>
      )}
      <form onSubmit={verifyPalindrome} className='mx-auto w-96'>
        <div className='mb-5'>
          <label
            htmlFor='input-palindrome'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Texto a evaluar
          </label>
          <input
            autoComplete='off'
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
          className='text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2 text-center me-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 inline-flex items-center
        disabled:cursor-not-allowed disabled:bg-gray-600 disabled:hover:bg-gray-600'
        >
          {loading && <LoadingIcon></LoadingIcon>}
          {loading ? 'Verificando...' : 'Verificar'}
        </button>
      </form>
    </div>
  );
}
