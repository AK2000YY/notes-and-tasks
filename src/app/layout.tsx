export default function LayoutRoot({ children }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <h1>hello from root layout</h1>
        {children}
      </body>
    </html>
  )
}