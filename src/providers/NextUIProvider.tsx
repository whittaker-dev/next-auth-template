import {NextUIProvider as TypeNextUIProvider} from '@nextui-org/react'

export function NextUIProvider({children}: { children: React.ReactNode }) {
  return (
    <TypeNextUIProvider>
      {children}
    </TypeNextUIProvider>
  )
}