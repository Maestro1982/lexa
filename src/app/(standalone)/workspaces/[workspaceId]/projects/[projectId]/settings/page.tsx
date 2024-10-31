import { redirect } from 'next/navigation';

import { getCurrent } from '@/features/auth/queries';

import { ProjectIdSettingsClient } from '@/app/(standalone)/workspaces/[workspaceId]/projects/[projectId]/settings/client';

const ProjectIdSettingsPage = async () => {
  const user = await getCurrent();

  if (!user) redirect('/sign-in');

  return <ProjectIdSettingsClient />;
};
export default ProjectIdSettingsPage;
