import './globals.css'

export const metadata = {
  title: 'WoodCraft — Woodworking Tutorials',
  description: 'Step-by-step woodworking project tutorials with photos',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
