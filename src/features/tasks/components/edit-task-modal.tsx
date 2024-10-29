'use client';

import { ResponsiveModal } from '@/components/responsive-modal';

import { EditTaskFormWrapper } from '@/features/tasks/components/edit-task-form-wrapper';
import { useEditTaskModal } from '@/features/tasks/hooks/use-edit-task-modal';

export const EditTaskModal = () => {
  const { taskId, close } = useEditTaskModal();

  return (
    <ResponsiveModal isOpen={!!taskId} onOpenChange={close}>
      {taskId && <EditTaskFormWrapper onCancel={close} id={taskId} />}
    </ResponsiveModal>
  );
};
