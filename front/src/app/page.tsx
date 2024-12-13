import { Suspense } from 'react';
import Historical from './components/historical';
import Loading from './components/loading';
import FormPalindrome from './components/form-palindrome';

export default async function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <FormPalindrome></FormPalindrome>
      <Suspense fallback={<Loading />}>
        <Historical></Historical>
      </Suspense>
    </main>
  );
}
