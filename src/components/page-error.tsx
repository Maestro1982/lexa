import { AlertTriangle } from 'lucide-react';

interface PageErrorProps {
  message: string;
}

export const PageError = ({ message }: PageErrorProps) => {
  message = 'Something went wrong';
  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <AlertTriangle className='text-sm font-medium text-red-500 mb-2' />
      <p className='text-sm font-medium text-red-500'>{message}</p>
    </div>
  );
};
