import Link from 'next/link'
import Image from 'next/image'
import {useAuthUser} from 'next-firebase-auth'
import Footer from "./Footer";

const Navbar = () => {
  const AuthUser = useAuthUser()
  return (
    <div className="absolute relative fixed">
      <div className="absolute top-0 h-14 w-full pl-4 pr-4 flex justify-between align-center bg-zinc-800 bg-cover">
        <div className="flex items-center">
          <button className="p-2 flex justify-center">
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M0 12H18V10H0V12ZM0 7H18V5H0V7ZM0 0V2H18V0H0Z" fill="white" fillOpacity="0.87"/>
            </svg>
          </button>
          <Link href="/"><a><h1 className="font-extrabold text-4xl text-slate-500 ml-2">NXT</h1></a></Link>
        </div>
        <div className="w-2/3 items-center">
          <form method="get" action="/results" className="w-full ml-10 mr-6 mt-2 flex flex-y items-center border border-zinc-900 bg-zinc-900 rounded-lg"
                noValidate>
            <input name="search_query" type="text" className="w-full rounded-lg" autoComplete="on" required={true} />
            <button type="submit" className="w-16 flex justify-center" >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" focusable={false}>
                <path d="M12.5 11H11.71L11.43 10.73C12.41 9.59 13 8.11 13 6.5C13 2.91 10.09 0 6.5 0C2.91 0 0 2.91 0 6.5C0 10.09 2.91 13 6.5 13C8.11 13 9.59 12.41 10.73 11.43L11 11.71V12.5L16 17.49L17.49 16L12.5 11ZM6.5 11C4.01 11 2 8.99 2 6.5C2 4.01 4.01 2 6.5 2C8.99 2 11 4.01 11 6.5C11 8.99 8.99 11 6.5 11Z" fill="#808080"/>
              </svg>
            </button>
          </form>
        </div>
        <div className="ml-20 mt-3 grid grid-cols-4 gap-2 items-center min-w-[225px]">
          <button className="pt-1 h-6 w-6">
            <svg width="24" height="24" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" fill="none" xmlns="http://www.w3.org/2000/svg" focusable={false} className="block" style={{'pointer-events': 'none'}}>
              <path fillRule="evenodd" clipRule="evenodd" d="M11.0898 1.91002C9.07976 -0.0999846 6.06976 -0.509985 3.64976 0.670015L7.98976 5.01002L4.98976 8.01002L0.649759 3.67002C-0.520241 6.10002 -0.110241 9.09002 1.89976 11.1C3.75976 12.96 6.47976 13.45 8.78976 12.58L17.8998 21.69C18.2898 22.08 18.9198 22.08 19.3098 21.69L21.6098 19.39C21.9998 19 21.9998 18.37 21.6098 17.98L12.5398 8.90001C13.4598 6.56001 12.9798 3.80002 11.0898 1.91002Z" fill="white" fillOpacity="0.6"/>
            </svg>
          </button>
          <button className="pt-1 h-6 w-6">
            <svg width="24" height="24" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" fill="none" xmlns="http://www.w3.org/2000/svg" focusable={false} className="block" style={{'pointer-events': 'none'}}>
              <path fillRule="evenodd" clipRule="evenodd" d="M0 4H4V0H0V4ZM6 16H10V12H6V16ZM0 16H4V12H0V16ZM0 10H4V6H0V10ZM6 10H10V6H6V10ZM12 0V4H16V0H12ZM6 4H10V0H6V4ZM12 10H16V6H12V10ZM12 16H16V12H12V16Z" fill="white" fillOpacity="0.6"/>
            </svg>
          </button>
          <button className="pt-1 h-6 w-6">
            <svg width="24" height="24" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" fill="none" xmlns="http://www.w3.org/2000/svg" focusable={false} className="block" style={{'pointer-events': 'none'}}>
              <path fillRule="evenodd" clipRule="evenodd" d="M8 20C9.1 20 10 19.1 10 18H6C6 19.1 6.89 20 8 20ZM14 14V9C14 5.93 12.36 3.36 9.5 2.68V2C9.5 1.17 8.83 0.5 8 0.5C7.17 0.5 6.5 1.17 6.5 2V2.68C3.63 3.36 2 5.92 2 9V14L0 16V17H16V16L14 14Z" fill="white" fillOpacity="0.6"/>
            </svg>
          </button>
          <button className="h-8 w-8">
            <Image src={AuthUser.photoURL || '/missing.png'} width="32px" height="32px" alt="Avatar Image" className="rounded-full" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;