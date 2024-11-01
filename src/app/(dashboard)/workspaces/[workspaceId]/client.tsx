'use client';

import { useGetMembers } from '@/features/members/api/use-get-members';
import { useGetProjects } from '@/features/projects/api/use-get-projects';
import { useGetTasks } from '@/features/tasks/api/use-get-tasks';
import { useGetWorkspaceAnalytics } from '@/features/workspaces/api/use-get-workspace-analytics';

import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';
import { useCreateProjectModal } from '@/features/projects/hooks/use-create-project-modal';
import { useCreateTaskModal } from '@/features/tasks/hooks/use-create-task-modal';

import { Task } from '@/features/tasks/types';

import { PageLoader } from '@/components/page-loader';
import { PageError } from '@/components/page-error';
import { Analytics } from '@/components/analytics';

export const WorkspaceIdClient = () => {
  const workspaceId = useWorkspaceId();
  const { data: analytics, isLoading: isLoadingAnalytics } =
    useGetWorkspaceAnalytics({ workspaceId });
  const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({
    workspaceId,
  });
  const { data: projects, isLoading: isLoadingProjects } = useGetProjects({
    workspaceId,
  });
  const { data: members, isLoading: isLoadingMembers } = useGetMembers({
    workspaceId,
  });

  const { open: createProject } = useCreateProjectModal();
  const { open: createTask } = useCreateTaskModal();

  const isLoading =
    isLoadingAnalytics ||
    isLoadingTasks ||
    isLoadingProjects ||
    isLoadingMembers;

  if (isLoading) {
    return <PageLoader />;
  }

  if (!analytics || !tasks || !projects || !members) {
    return <PageError message='Failed to load workspace data' />;
  }

  return (
    <div className='w-full h-full flex flex-col space-y-4'>
      <Analytics data={analytics} />
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-4'></div>
    </div>
  );
};

interface TaskListProps {
  tasks: Task[];
}

export const TaskList = ({ tasks }: TaskListProps) => {
  return <div className='flex flex-col gap-y-4 col-span-1'></div>;
};
