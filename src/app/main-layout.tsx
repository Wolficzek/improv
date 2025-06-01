'use client'

import {
  AppShell,
  Burger,
  Group,
  UnstyledButton,
  useMantineColorScheme,
  NavLink,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { ReactNode } from 'react'
import { IconMoonStars, IconSun } from '@tabler/icons-react'
import { UserPanel } from '@/components/UserPanel'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  return (
    <UnstyledButton onClick={() => toggleColorScheme()}>
      {colorScheme === 'auto' ? (
        <IconSun stroke={1.5} />
      ) : (
        <IconMoonStars stroke={1.5} />
      )}
    </UnstyledButton>
  )
}

export function MainLayout({ children }: { children: ReactNode }) {
  const [opened, { toggle }] = useDisclosure()
  const pathname = usePathname()

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 250,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
    >
      <AppShell.Header>
        <Group px="md" h="100%" justify="space-between">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <ThemeToggle />
        </Group>
      </AppShell.Header>

      <AppShell.Navbar p="md">
        <AppShell.Section grow>
          <NavLink
            component={Link}
            href="/sleep"
            label="Sleep tracker"
            active={pathname === '/sleep'}
            onClick={toggle}
          />
          <NavLink
            component={Link}
            href="/todo"
            label="To do list"
            active={pathname === '/todo'}
            onClick={toggle}
          />
        </AppShell.Section>

        <AppShell.Section>
          <UserPanel />
        </AppShell.Section>
      </AppShell.Navbar>

      <AppShell.Main>{children}</AppShell.Main>
    </AppShell>
  )
}
