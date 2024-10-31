'use client';

import { useGetWorkspaceInfo } from '@/features/workspaces/api/use-get-workspace-info';
import { useWorkspaceId } from '@/features/workspaces/hooks/use-workspace-id';

import { JoinWorkspaceForm } from '@/features/workspaces/components/join-workspace-form';

import { PageLoader } from '@/components/page-loader';
import { PageError } from '@/components/page-error';

export const WorkspaceIdJoinClient = () => {
  const workspaceId = useWorkspaceId();
  const { data: initialValues, isLoading } = useGetWorkspaceInfo({
    workspaceId,
  });

  if (isLoading) {
    return <PageLoader />;
  }

  if (!initialValues) {
    return <PageError message='Project info not found' />;
  }
  return (
    <div className='w-full lg:max-w-xl'>
      <JoinWorkspaceForm initialValues={initialValues} />
    </div>
  );
};
