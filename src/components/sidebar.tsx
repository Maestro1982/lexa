import Image from 'next/image';
import Link from 'next/link';

import { DottedSeparator } from '@/components/dotted-separator';
import { Navigation } from '@/components/navigation';

export const Sidebar = () => {
  return (
    <aside className='h-full w-full bg-neutral-100 p-4'>
      <Link href='/'>
        <div className='flex items-center'>
          <Image src='/logo.svg' alt='logo' width={50} height={20} />
          <span className='ml-2 text-xl uppercase tracking-widest text-blue-600 font-bold'>
            Lexa
          </span>
        </div>
      </Link>
      <DottedSeparator className='my-4' />
      <Navigation />
    </aside>
  );
};
