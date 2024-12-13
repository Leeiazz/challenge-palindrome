'use client';
import { useEffect, useState } from 'react';
import Historical from './components/historical';
import Loading from './components/loading';
import FormPalindrome from './components/form-palindrome';
import { RegisterInterface } from './interfaces/register';

export default function Home() {
  const [registers, setRegisters] = useState<RegisterInterface[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchRegisters = async () => {
      const response = await fetch('http://localhost:3000/historical');
      const data = await response.json();
      setRegisters((data.registers as RegisterInterface[]) || []);
      setLoading(false);
    };
    fetchRegisters();
    return () => {};
  }, []);

  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <FormPalindrome setRegisters={setRegisters}></FormPalindrome>
      {loading ? (
        <Loading></Loading>
      ) : (
        <Historical registers={registers}></Historical>
      )}
    </main>
  );
}
