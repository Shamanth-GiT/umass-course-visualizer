import '@styles/globals.css'

export const metadata = {
  title: 'UMass Course Visualizer',
  description: 'an app for students to visualize courses',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
