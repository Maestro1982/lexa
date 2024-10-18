import Image from 'next/image';
import Link from 'next/link';

import { UserButton } from '@/features/auth/components/user-button';

interface StandAloneLayoutProps {
  children: React.ReactNode;
}

const StandAloneLayout = ({ children }: StandAloneLayoutProps) => {
  return (
    <main className='bg-neutral-100 min-h-screen'>
      <div className='mx-auto max-w-screen-2xl p-4'>
        <nav className='flex justify-between items-center h-[72px]'>
          <Link href='/'>
            <div className='flex items-center'>
              <Image src='/logo.svg' alt='logo' width={50} height={20} />
              <span className='ml-2 text-xl uppercase tracking-widest text-blue-600 font-bold'>
                Lexa
              </span>
            </div>
          </Link>
          <UserButton />
        </nav>
        <div className='flex flex-col items-center justify-center py-4'>
          {children}
        </div>
      </div>
    </main>
  );
};
export default StandAloneLayout;
