'use client'

import {
  MantineProvider,
  createTheme,
  localStorageColorSchemeManager,
} from '@mantine/core'
import '@mantine/core/styles.css'
import { ReactNode } from 'react'

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = createTheme({
    primaryColor: 'indigo',
    primaryShade: 6,
    colors: {
      // Optional: customize color palette
      brand: [
        '#f0f4ff',
        '#d6e1ff',
        '#acc2ff',
        '#7aa0ff',
        '#4a7eff',
        '#1a5cff',
        '#0042e0',
        '#0034b5',
        '#002a96',
        '#001f78',
      ],
    },
    fontFamily: 'Inter, sans-serif',
    fontFamilyMonospace: 'Monaco, Courier, monospace',
    headings: {
      fontFamily: 'Montserrat, sans-serif',
    },
    components: {
      Button: {
        defaultProps: {
          variant: 'filled',
        },
      },
      Card: {
        styles: {
          root: {
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          },
        },
      },
    },
  })

  const colorSchemeManager = localStorageColorSchemeManager({
    key: 'mantine-color-scheme',
  })

  return (
    <MantineProvider
      theme={theme}
      colorSchemeManager={colorSchemeManager}
      defaultColorScheme="dark"
    >
      {children}
    </MantineProvider>
  )
}
