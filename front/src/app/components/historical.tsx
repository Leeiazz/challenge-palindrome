import AffirmativeIcon from '../icons/AffirmativeIcon';
import NegativeIcon from '../icons/NegativeIcon';
import { RegisterInterface } from '../interfaces/register';

export default async function Historical() {
  const response = await fetch('http://localhost:3000/historical');
  const data = await response.json();
  const registers: RegisterInterface[] = data.registers;
  const registersSorted = registers.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return registers.length > 0 ? (
    <div className='w-full max-w-md mt-10 p-4 bg-lead-50 border border-lead-200 rounded-lg shadow sm:p-8 dark:bg-lead-800 dark:border-lead-700'>
      <div className='flex items-center justify-between mb-4'>
        <h5 className='text-xl font-bold leading-none text-gray-900 dark:text-white'>
          Historial de evaluaciones
        </h5>
      </div>
      <div className='flow-root'>
        <ul
          role='list'
          className='divide-y divide-lead-200 dark:divide-lead-700'
        >
          {registersSorted.map((register, index) => (
            <li className='py-3 sm:py-4' key={register.date + index}>
              <div className='flex items-center'>
                <div className='flex-1 min-w-0 ms-4'>
                  <p className='text-sm font-medium text-lead-900 dark:text-white'>
                    {register.text}
                  </p>
                  <p className='text-sm text-lead-500 truncate dark:text-lead-400'>
                    {new Date(register.date).toLocaleString()}
                  </p>
                </div>
                <div className='inline-flex items-center text-base font-semibold text-lead-900 dark:text-white'>
                  {register.isPalindrome ? (
                    <AffirmativeIcon></AffirmativeIcon>
                  ) : (
                    <NegativeIcon></NegativeIcon>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <p>No hay registros</p>
  );
}
