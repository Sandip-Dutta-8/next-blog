import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeContextProvider } from '../context/ThemeContext'
import ThemeProviders from '../providers/ThemeProviders'
import AuthProvider from '../providers/AuthProvider'
import Navbar from '../components/navbar/Navbar'
import Footer from '../components/footer/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Blog App',
  description: 'The best blog app!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeContextProvider>
            <ThemeProviders>
              <div className='container'>
                <div className='wrapper'>
                  <Navbar />
                  {children}
                  <Footer />
                </div>
              </div>
            </ThemeProviders>
          </ThemeContextProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
