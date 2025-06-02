'use client'
import { SleepTableList } from '@/app/sleep/components/SleepTableList'
import { useSleepData } from '@/app/sleep/hooks/useSleepData'
import { useDeleteSleepData } from '@/app/sleep/hooks/useDeleteSleepData'
import { useMediaQuery } from '@mantine/hooks'
import { LoaderCentered } from '@/components/LoaderCentered'
import { SleepAccordionList } from '@/app/sleep/components/SleepAccordionList'
import { Container } from '@mantine/core'
import { SleepListControl } from '@/app/sleep/components/SleepControl'

export default function DashboardPage() {
  const { data, isFetching } = useSleepData()
  const { mutate: removeSleepEntry } = useDeleteSleepData()
  const isMobile = useMediaQuery('(max-width: 600px)') as boolean

  const onDelete = (id: number) => {
    removeSleepEntry(id)
  }

  return (
    <Container size="responsive">
      <SleepListControl isMobile={isMobile} />
      {isFetching ? (
        <LoaderCentered />
      ) : isMobile ? (
        <SleepAccordionList data={data} onDelete={onDelete} />
      ) : (
        <SleepTableList data={data} onDelete={onDelete} />
      )}
    </Container>
  )
}
