import { NoteDelete } from '@/components/note-delete'

export default async function Page({ params }: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    return (
        <NoteDelete
            id={+id}
        />
    )
}