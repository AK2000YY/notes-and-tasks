import SearchList from '@/components/search-list'
import styles from '@/styles/style-body.module.css'

export default async function Page({ params }: {
    params: Promise<{ slug: string[] }>
}) {
    const { slug } = await params
    return (
        <div className={styles.overlay}>
            <SearchList
                isNote={slug[0]}
                search={slug[1]}
            />
        </div>
    )
}