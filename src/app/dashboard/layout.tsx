export default function Layout({ children, crud, task }: {
    children: React.ReactNode,
    crud: React.ReactNode,
    task: React.ReactNode
}) {
    return (
        <>
            {children}
            {crud}
        </>
    )
}