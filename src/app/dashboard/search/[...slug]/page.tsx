import SearchList from '@/components/search-list'

export default async function Page({ params }: {
    params: Promise<{ slug: string[] }>
}) {
    const { slug } = await params
    return (
        <SearchList
            isNote={slug[0]}
            search={slug[1]}
        />
    )
}