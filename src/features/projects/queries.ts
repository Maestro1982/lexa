import { createSessionClient } from '@/lib/appwrite';
import { getMember } from '@/features/members/utils';
import { Project } from '@/features/projects/types';
import { DATABASE_ID, PROJECTS_ID } from '@/constants';

interface GetProjectProps {
  projectId: string;
}

export const getProject = async ({ projectId }: GetProjectProps) => {
  const { databases, account } = await createSessionClient();
  const user = await account.get();

  const project = await databases.getDocument<Project>(
    DATABASE_ID,
    PROJECTS_ID,
    projectId
  );

  const member = await getMember({
    databases,
    userId: user.$id,
    workspaceId: project.workspaceId,
  });

  if (!member) {
    return new Error('Unauthorized');
  }

  return project;
};
