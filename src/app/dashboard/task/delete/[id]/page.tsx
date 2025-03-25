import { TaskDelete } from '@/components/task-delete'

export default async function Page({ params }: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    return <TaskDelete id={+id} />
}