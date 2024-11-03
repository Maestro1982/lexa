'use client';

import { useCallback } from 'react';
import { Loader, PlusIcon } from 'lucide-react';
import { useQueryState } from 'nuqs';

import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DottedSeparator } from '@/components/dotted-separator';

import { DataFilters } from '@/features/tasks/components/data-filters';
import { DataTable } from '@/features/tasks/components/data-table';
import { columns } from '@/features/tasks/components/columns';
import { DataKanban } from '@/features/tasks/components/data-kanban';
import { DataCalendar } from '@/features/tasks/components/data-calendar';

import { useCreateTaskModal } from '@/features/tasks/hooks/use-create-task-modal';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { useTaskFilters } from '@/features/tasks/hooks/use-task-filters';
import { useProjectId } from '@/features/projects/hooks/use-project-id';

import { useGetTasks } from '@/features/tasks/api/use-get-tasks';
import { useBulkUpdateTasks } from '@/features/tasks/api/use-bulk-update-tasks';

import { TaskStatus } from '@/features/tasks/types';

interface TaskViewSwitcherProps {
  hideProjectFilter?: boolean;
}

export const TaskViewSwitcher = ({
  hideProjectFilter,
}: TaskViewSwitcherProps) => {
  const [{ projectId, status, assigneeId, dueDate }] = useTaskFilters();
  const { open } = useCreateTaskModal();
  const { mutate: bulkUpdate } = useBulkUpdateTasks();

  const [view, setView] = useQueryState('task-view', {
    defaultValue: 'table',
  });
  const workspaceId = useWorkspaceId();
  const paramDefaultProjectId = useProjectId();

  const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
    workspaceId,
    projectId: paramDefaultProjectId || projectId,
    assigneeId,
    status,
    dueDate,
  });

  const onKanbanChange = useCallback(
    (tasks: { $id: string; status: TaskStatus; position: number }[]) => {
      bulkUpdate({ json: { tasks } });
    },
    [bulkUpdate]
  );

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
        <DataFilters hideProjectFilter={hideProjectFilter} />
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
              <DataKanban
                data={tasks?.documents ?? []}
                onChange={onKanbanChange}
              />
            </TabsContent>
            <TabsContent value='calendar' className='mt-0 h-full pb-4'>
              <DataCalendar data={tasks?.documents ?? []} />
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  );
};
