"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactHookFormSetup = void 0;
exports.reactHookFormSetup = {
    files: {
        'src/components/form-provider.tsx': `
'use client';

import { FormProvider as HookFormProvider } from 'react-hook-form';

export function FormProvider({ children, ...props }) {
  return <HookFormProvider {...props}>{children}</HookFormProvider>;
}
`,
        'src/lib/form-schemas.ts': `
import * as z from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const signupSchema = loginSchema.extend({
  name: z.string().min(2),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});
`
    },
    envVars: {},
    dependencies: {
        additional: ['react-hook-form', '@hookform/resolvers', 'zod']
    },
    postInstall: []
};
