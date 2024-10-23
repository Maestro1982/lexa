'use client';

import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

import { Button } from '@/components/ui/button';

const ErrorPage = () => {
  return (
    <div className='h-screen flex flex-col gap-y-4 items-center justify-center'>
      <AlertTriangle className='size-6 text-red-500' />
      <p className='text-sm text-red-500 font-semibold'>Something went wrong</p>
      <Button variant='secondary' size='sm' asChild>
        <Link href='/'>Back to home</Link>
      </Button>
    </div>
  );
};
export default ErrorPage;
