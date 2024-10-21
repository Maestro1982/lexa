import z from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Required'),
});

export const registerSchema = z.object({
  name: z.string().trim().min(1, 'Required'),
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const createWorkspaceSchema = z.object({
  name: z.string().trim().min(1, 'Required'),
  image: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === '' ? undefined : value)),
    ])
    .optional(),
});

export const updateWorkspaceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Must be at least 1 or more characters.')
    .optional(),
  image: z
    .union([
      z.instanceof(File),
      z.string().transform((value) => (value === '' ? undefined : value)),
    ])
    .optional(),
});
