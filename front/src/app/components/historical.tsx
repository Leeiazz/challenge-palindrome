import { RegisterInterface } from '../interfaces/register';

export default async function Historical() {
  const response = await fetch('http://localhost:3000/historical');
  const data: { registers: RegisterInterface[] } = await response.json();
  return (
    <div className='flex flex-col'>
      <div className='overflow-x-auto sm:-mx-6 lg:-mx-8'>
        <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
          <div className='overflow-hidden'>
            <table className='min-w-full text-left text-sm font-light'>
              <thead className='border-b font-medium dark:border-neutral-500'>
                <tr>
                  <th scope='col' className='px-6 py-4'>
                    Texto
                  </th>
                  <th scope='col' className='px-6 py-4'>
                    Palindromo
                  </th>
                  <th scope='col' className='px-6 py-4'>
                    Fecha
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.registers.map((register) => (
                  <tr
                    key={register.text}
                    className='border-b dark:border-neutral-500'
                  >
                    <td className='whitespace-nowrap px-6 py-4 font-medium'>
                      {register.text}
                    </td>
                    <td className='whitespace-nowrap px-6 py-4'>
                      {register.isPalindrome ? 'Si' : 'No'}
                    </td>
                    <td className='whitespace-nowrap px-6 py-4'>
                      {register.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
