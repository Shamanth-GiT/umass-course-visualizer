import '@styles/globals.css'
import AuthProvider from '@components/AuthProvider';

export const metadata = {
  title: 'UMass Course Visualizer',
  description: 'an app for students to visualize courses',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
