export default function Layout({ children, crud }: {
    children: React.ReactNode,
    crud: React.ReactNode
}) {
    return (
        <>
            {children}
            {crud}
        </>
    )
}