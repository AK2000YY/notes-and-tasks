export default function Layout({ children, note, task }: {
    children: React.ReactNode,
    note: React.ReactNode,
    task: React.ReactNode
}) {
    return (
        <>
            {children}
        </>
    )
}