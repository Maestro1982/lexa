import { useState } from 'react';
import { PencilIcon, XIcon } from 'lucide-react';

import { Task } from '@/features/tasks/types';

import { useUpdateTask } from '@/features/tasks/api/use-update-task';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

import { DottedSeparator } from '@/components/dotted-separator';

interface TaskDescriptionProps {
  task: Task;
}

export const TaskDescription = ({ task }: TaskDescriptionProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [value, setValue] = useState(task.description);

  const { mutate, isPending } = useUpdateTask();

  const handleSave = () => {
    mutate({ json: { description: value }, param: { taskId: task.$id } });
  };

  return (
    <div className='p-4 border rounded-lg'>
      <div className='flex items-center justify-between'>
        <p className='text-lg font-semibold'>Overview</p>
        <Button
          onClick={() => setIsEditing((prev) => !prev)}
          variant='secondary'
          size='sm'
        >
          {isEditing ? (
            <XIcon className='size-4 mr-2' />
          ) : (
            <PencilIcon className='size-4 mr-2' />
          )}
          {isEditing ? 'Cancel' : 'Edit'}
        </Button>
      </div>
      <DottedSeparator className='my-4' />
      {isEditing ? (
        <div className='flex flex-col gap-y-4'>
          <Textarea
            placeholder='Add a description...'
            value={value}
            rows={4}
            onChange={(e) => setValue(e.target.value)}
            disabled={isPending}
          />
          <Button
            onClick={handleSave}
            size='sm'
            className='w-fit ml-auto'
            disabled={isPending}
          >
            {isPending ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      ) : (
        <div>
          {task.description || (
            <span className='text-muted-foreground'>No description set</span>
          )}
        </div>
      )}
    </div>
  );
};