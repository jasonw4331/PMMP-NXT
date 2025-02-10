'use client'

import { CorbadoProvider } from '@corbado/react'

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CorbadoProvider
      projectId={process.env.NEXT_PUBLIC_CORBADO_PROJECT_ID}
      isDevMode={process.env.NODE_ENV == 'development'}>
      {children}
    </CorbadoProvider>
  )
}
