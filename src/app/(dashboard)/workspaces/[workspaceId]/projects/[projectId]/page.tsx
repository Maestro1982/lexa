import Link from 'next/link';
import { redirect } from 'next/navigation';
import { PencilIcon } from 'lucide-react';

import { getCurrent } from '@/features/auth/queries';
import { getProject } from '@/features/projects/queries';
import { ProjectAvatar } from '@/features/projects/components/project-avatar';

import { Button } from '@/components/ui/button';

interface ProjectIdPageProps {
  params: { projectId: string };
}

const ProjectIdpage = async ({ params }: ProjectIdPageProps) => {
  const user = await getCurrent();

  if (!user) redirect('/sign-in');

  const initialValues = await getProject({
    projectId: params.projectId,
  });

  // Check if the returned value is an instance of Error
  if (initialValues instanceof Error) {
    throw new Error('Project not found');
  }

  return (
    <div className='flex flex-col gap-y-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-x-2'>
          <ProjectAvatar
            name={initialValues.name}
            image={initialValues.imageUrl}
            className='size-8'
          />
          <p className='text-lg font-semibold'>{initialValues.name}</p>
        </div>
        <div>
          <Button variant='secondary' size='sm' asChild>
            <Link
              href={`/workspaces/${initialValues.workspaceId}/projects/${initialValues.$id}/settings`}
            >
              <PencilIcon className='size-4 mr-2' />
              Edit Project
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default ProjectIdpage;
