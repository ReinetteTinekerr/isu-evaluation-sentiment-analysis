'use client'
import { useState } from 'react'
import './globals.css'
import { Montserrat } from 'next/font/google'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useRouter, usePathname } from 'next/navigation'

const queryClient = new QueryClient();

const montserrat = Montserrat({
  weight: '700',
  subsets: ['latin'],
  style: 'normal',
})

// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <NavBar />
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  )
}

function NavBar() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const adminLogin = (e: any) => {
    e.preventDefault();
    const email = e.target.email.value;
    const pass = e.target.password.value;
    if (email === 'thesis@thesis.com' && pass === 'thesis') {
      localStorage.setItem('user', 'admin');
      setShowLoginModal(false);
      router.replace('/admin');
    }

  }
  return (
    <nav className='flex'>
      <div className='h-16 w-full bg-gradient-to-r from-green-600 to-emerald-600  shadow-md p-5 flex justify-between text-white items-center'>
        <div onClick={() => {
          router.replace('/');
        }} className={`${montserrat.className} text-xl md:text-3xl font-extrabold `}>Sentiment Analysis</div>
        <div className='flex flex-row items-center '>
          <button disabled={pathname === '/admin' ? true : false} onClick={() => setShowLoginModal(true)} className='font-semibold hover:text-rose-400 hover:font-bold'>ADMIN</button>
        </div>
      </div>



      <div id="authentication-modal" tabIndex={-1} aria-hidden="true" style={{ visibility: showLoginModal ? "visible" : "hidden" }} className="fixed flex items-center justify-center z-50 p-4 overflow-x-hidden overflow-y-auto h-screen w-screen">
        <div className="">
          <div className="relative bg-white rounded-lg shadow-xl">
            <button onClick={() => setShowLoginModal(false)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="px-6 py-6 lg:px-8">
              <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Login</h3>
              <form className="space-y-6" action="#" onSubmit={adminLogin}>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                  <input type="email" name="email" id="email" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder="name@company.com" required />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Your password</label>
                  <input type="password" name="password" id="password" placeholder="•••••••" className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " required />
                </div>
                <button type="submit" className="w-full text-white bg-green-500 hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-lg px-5 py-2.5 text-center ">Login </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}