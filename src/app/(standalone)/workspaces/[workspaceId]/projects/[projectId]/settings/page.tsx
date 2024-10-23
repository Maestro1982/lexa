import { redirect } from 'next/navigation';

import { getCurrent } from '@/features/auth/queries';
import { getProject } from '@/features/projects/queries';
import { EditProjectForm } from '@/features/projects/components/edit-project-form';

interface ProjectIdSettingsPageProps {
  params: {
    projectId: string;
  };
}

const ProjectIdSettingsPage = async ({
  params,
}: ProjectIdSettingsPageProps) => {
  const user = await getCurrent();

  if (!user) redirect('/sign-in');

  const initialValues = await getProject({ projectId: params.projectId });

  // Check if the returned value is an instance of Error
  if (initialValues instanceof Error) {
    throw new Error('Project not found');
  }

  return (
    <div className='w-full lg:max-w-xl'>
      <EditProjectForm initialValues={initialValues} />
    </div>
  );
};
export default ProjectIdSettingsPage;
