import { db } from "@/db/drizzle"
import { notesTable } from "@/db/schema/notes"
import { tasksTable } from "@/db/schema/tasks"
import { and, eq, like, sql } from "drizzle-orm"
import styles from '@/styles/style-body.module.css';
import { auth } from "@/auth";
import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import { IoClose } from "react-icons/io5";

const searchNotesOrTasks = async (isNotes: string, search: string, userId: string) => {
    let searchValue = search.split('').join('%');
    console.log('%%%', searchValue)
    try {
        if (isNotes === 'note') {
            console.log('%%%', searchValue)
            return await db
                .select()
                .from(notesTable)
                .where(
                    and(
                        eq(notesTable.userId, userId),
                        like(sql<string>`lower(${notesTable.title})`, `%${searchValue}%`)
                    )
                )
        }
        else
            return await db
                .select()
                .from(tasksTable)
                .where(
                    and(
                        eq(tasksTable.userId, userId),
                        like(tasksTable.title, `%${searchValue}%`)
                    )
                )

    } catch (e) {
        return []
    }
}


export default async function SearchList({ isNote, search }: {
    isNote: string,
    search: string
}) {
    const session = await auth();
    const userId = session?.user?.id

    if (!userId) return null;

    const searchResults = await searchNotesOrTasks(isNote, search, userId);
    console.log('f ak', searchResults)

    return (
        <div className={styles['search-list']}>
            <h1>Search Result</h1>
            {
                searchResults.length === 0 ?
                    <p>There aren't any result</p> :
                    searchResults.map(ele =>
                        <div
                            className={styles['search-card']}
                            key={ele.id}
                        >
                            <p>{ele.title}</p>
                            {isNote === 'note' && <Link href={`/dashboard/note/show/${ele.id}`}><FaArrowRight /></Link>}
                        </div>
                    )
            }
            <Link href={'/dashboard'}><IoClose className={styles.close} /></Link>
        </div>
    )
}