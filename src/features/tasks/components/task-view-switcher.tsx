'use client';

import { Loader, PlusIcon } from 'lucide-react';
import { useQueryState } from 'nuqs';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DottedSeparator } from '@/components/dotted-separator';

import { DataFilters } from '@/features/tasks/components/data-filters';
import { DataTable } from '@/features/tasks/components/data-table';
import { columns } from '@/features/tasks/components/columns';

import { useCreateTaskModal } from '@/features/tasks/hooks/use-create-task-modal';
import { useGetTasks } from '@/features/tasks/api/use-get-tasks';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { useTaskFilters } from '@/features/tasks/hooks/use-task-filters';

export const TaskViewSwitcher = () => {
  const [{ projectId, status, assigneeId, dueDate }] = useTaskFilters();
  const [view, setView] = useQueryState('task-view', {
    defaultValue: 'table',
  });
  const workspaceId = useWorkspaceId();
  const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
    workspaceId,
    projectId,
    assigneeId,
    status,
    dueDate,
  });
  const { open } = useCreateTaskModal();
  return (
    <Tabs
      className='flex-1 w-full border rounded-lg'
      defaultValue={view}
      onValueChange={setView}
    >
      <div className='flex flex-col h-full overflow-auto p-4'>
        <div className='flex flex-col gap-y-2 lg:flex-row items-center justify-between'>
          <TabsList className='w-full lg:w-auto'>
            <TabsTrigger className='h-8 w-full lg:w-auto' value='table'>
              Table
            </TabsTrigger>
            <TabsTrigger className='h-8 w-full lg:w-auto' value='kanban'>
              Kanban
            </TabsTrigger>
            <TabsTrigger className='h-8 w-full lg:w-auto' value='calendar'>
              Calendar
            </TabsTrigger>
          </TabsList>
          <Button size='sm' className='w-full lg:w-auto' onClick={open}>
            <PlusIcon className='size-4 mr-2' />
            New
          </Button>
        </div>
        <DottedSeparator className='my-4' />
        <DataFilters />
        <DottedSeparator className='my-4' />
        {isLoadingTasks ? (
          <div className='w-full border rounded-lg h-[200px] flex flex-col items-center justify-center'>
            <Loader className='size-5 animate-spin text-muted-foreground' />
          </div>
        ) : (
          <>
            <TabsContent value='table' className='mt-0'>
              <DataTable columns={columns} data={tasks?.documents ?? []} />
            </TabsContent>
            <TabsContent value='kanban' className='mt-0'>
              {JSON.stringify(tasks)}
            </TabsContent>
            <TabsContent value='calendar' className='mt-0'>
              {JSON.stringify(tasks)}
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  );
};
