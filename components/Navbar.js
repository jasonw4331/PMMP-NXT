import Link from 'next/link'
import Image from 'next/image'
import {useAuthUser} from 'next-firebase-auth'
import Footer from "./Footer";

const Navbar = () => {
  const AuthUser = useAuthUser()
  return (
    <header className="sticky top-0 text-white font-medium">
      <div id="sidebar" className="h-screen w-60 pt-14 flex flex-x bg-zinc-800 bg-cover">
        <ul className="relative">
          <li className="p-2 hover:bg-zinc-600">
            <Link href="/">
              <a className="flex items-center">
                <div>
                  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.7333 20.6364V14.6364H14.7333V20.6364H19.7333V12.6364H22.7333L12.7333 3.63635L2.73328 12.6364H5.73328V20.6364H10.7333Z" fill="white"/>
                  </svg>
                </div>
                <h2 className="ml-2">Home</h2>
              </a>
            </Link>
          </li>
          <li className="p-2 hover:bg-zinc-600">
            <Link href="/feed/explore">
              <a className="flex items-center">
                <div>
                  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.7333 11.7416C12.1233 11.7416 11.6333 12.2316 11.6333 12.8416C11.6333 13.4516 12.1233 13.9416 12.7333 13.9416C13.3433 13.9416 13.8333 13.4516 13.8333 12.8416C13.8333 12.2316 13.3433 11.7416 12.7333 11.7416ZM12.7333 2.84155C7.21328 2.84155 2.73328 7.32155 2.73328 12.8416C2.73328 18.3616 7.21328 22.8416 12.7333 22.8416C18.2533 22.8416 22.7333 18.3616 22.7333 12.8416C22.7333 7.32155 18.2533 2.84155 12.7333 2.84155ZM14.9233 15.0316L6.73328 18.8416L10.5433 10.6516L18.7333 6.84155L14.9233 15.0316Z" fill="white"/>
                  </svg>
                </div>
                <h2 className="ml-2">Explore</h2>
              </a>
            </Link>
          </li>
          <li className="p-2 hover:bg-zinc-600">
            <Link href="/feed/following">
              <a className="flex items-center">
                <div>
                  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.7333 21.2218L10.2833 19.9018C5.13328 15.2318 1.73328 12.1518 1.73328 8.37177C1.73328 5.29177 4.15328 2.87177 7.23328 2.87177C8.97328 2.87177 10.6433 3.68177 11.7333 4.96177C12.8233 3.68177 14.4933 2.87177 16.2333 2.87177C19.3133 2.87177 21.7333 5.29177 21.7333 8.37177C21.7333 12.1518 18.3333 15.2318 13.1833 19.9118L11.7333 21.2218Z" fill="white"/>
                  </svg>
                </div>
                <h2 className="ml-2">Following</h2>
              </a>
            </Link>
          </li>
          <li className="flex items-center">
            <svg width="240" height="2" viewBox="0 0 302 2" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect opacity="0.12" x="-2" width="304" height="2" fill="white"/>
            </svg>
          </li>
          <li className="p-2 hover:bg-zinc-600">
            <Link href="/feed/history">
              <a className="flex items-center">
                <div>
                  <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.85328 13.9832C3.59528 18.7632 7.75528 22.4532 12.7333 22.4532C18.2333 22.4532 22.7333 17.9532 22.7333 12.4552C22.7333 6.95715 18.2333 2.45715 12.7333 2.45715C11.1808 2.457 9.64961 2.81838 8.26103 3.51267C6.87246 4.20696 5.66464 5.21508 4.73328 6.45715V2.45715H2.73628L2.73328 9.45715H9.73328V7.45715H6.53328C7.93328 5.65715 10.2353 4.45715 12.7353 4.45715C17.1333 4.45715 20.7333 8.05715 20.7333 12.4552C20.7333 16.8532 17.1333 20.4552 12.7333 20.4552C8.85628 20.4552 5.60328 17.6602 4.88528 13.9832H2.85328Z" fill="white"/>
                    <path d="M11.7352 7.45715V12.7572L14.9352 17.0552L16.5352 15.8582L13.7352 12.1582V7.45715" fill="white"/>
                  </svg>
                </div>
                <h2 className="ml-2">History</h2>
              </a>
            </Link>
          </li>
          <li className="p-2 hover:bg-zinc-600">
            <Link href="/feed/liked">
              <a className="flex items-center">
                <div>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 20H3V6.31579H2C1.46957 6.31579 0.960859 6.53759 0.585786 6.93241C0.210714 7.32722 0 7.8627 0 8.42105V17.8947C0 18.4531 0.210714 18.9886 0.585786 19.3834C0.960859 19.7782 1.46957 20 2 20ZM18 6.31579H11L12.122 2.77053C12.2221 2.45412 12.2494 2.11721 12.2016 1.78753C12.1538 1.45786 12.0322 1.14486 11.847 0.87431C11.6617 0.603764 11.4181 0.383413 11.1361 0.231406C10.8541 0.0793993 10.5418 8.64345e-05 10.225 0H10L5 5.72421V20H16L19.912 10.9516L20 10.5263V8.42105C20 7.8627 19.7893 7.32722 19.4142 6.93241C19.0391 6.53759 18.5304 6.31579 18 6.31579Z" fill="white"/>
                  </svg>
                </div>
                <h2 className="ml-2">Liked Plugins</h2>
              </a>
            </Link>
          </li>
          {AuthUser.claims.accessLevel > 0 && (
            <>
              <li className="flex items-center">
                <svg width="240" height="2" viewBox="0 0 302 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect opacity="0.12" x="-2" width="304" height="2" fill="white"/>
                </svg>
              </li>
              <li className="p-2 hover:bg-zinc-600">
                <Link href={"/user/" + encodeURI(AuthUser.displayName)}>
                  <a className="flex items-center">
                    <div>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 1.5C20 1.10218 19.7893 0.720644 19.4142 0.43934C19.0391 0.158035 18.5304 0 18 0C17.4696 0 16.9609 0.158035 16.5858 0.43934C16.2107 0.720644 16 1.10218 16 1.5V6H20V1.5ZM23 7.5H1C0.734784 7.5 0.48043 7.57902 0.292893 7.71967C0.105357 7.86032 0 8.05109 0 8.25L0 9.75C0 9.94891 0.105357 10.1397 0.292893 10.2803C0.48043 10.421 0.734784 10.5 1 10.5H2V12C2.00035 13.7288 2.79669 15.4045 4.25437 16.7438C5.71206 18.083 7.74165 19.0036 10 19.35V24H14V19.35C16.2584 19.0036 18.2879 18.083 19.7456 16.7438C21.2033 15.4045 21.9996 13.7288 22 12V10.5H23C23.2652 10.5 23.5196 10.421 23.7071 10.2803C23.8946 10.1397 24 9.94891 24 9.75V8.25C24 8.05109 23.8946 7.86032 23.7071 7.71967C23.5196 7.57902 23.2652 7.5 23 7.5ZM8 1.5C8 1.10218 7.78929 0.720644 7.41421 0.43934C7.03914 0.158035 6.53043 0 6 0C5.46957 0 4.96086 0.158035 4.58579 0.43934C4.21071 0.720644 4 1.10218 4 1.5V6H8V1.5Z" fill="white"/>
                      </svg>
                    </div>
                    <h2 className="ml-2">Your Plugins</h2>
                  </a>
                </Link>
              </li>
              <li className="p-2 hover:bg-zinc-600">
                <Link href="/">
                  <a className="flex items-center">
                    <div>
                      <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.7333 20.6364V14.6364H14.7333V20.6364H19.7333V12.6364H22.7333L12.7333 3.63635L2.73328 12.6364H5.73328V20.6364H10.7333Z" fill="white"/>
                      </svg>
                    </div>
                    <h2 className="ml-2">Undecided</h2>
                  </a>
                </Link>
              </li>
            </>
          )}
          {AuthUser.claims.accessLevel > 1 && (
            <>
              <li className="flex items-center">
                <svg width="240" height="2" viewBox="0 0 302 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect opacity="0.12" x="-2" width="304" height="2" fill="white"/>
                </svg>
              </li>
              <li className="p-2 hover:bg-zinc-600">
                <Link href="/review">
                  <a className="flex items-center">
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="none">
                        <path d="M21,5l-9-4L3,5v6c0,5.55,3.84,10.74,9,12c2.3-0.56,4.33-1.9,5.88-3.71l-3.12-3.12c-1.94,1.29-4.58,1.07-6.29-0.64 c-1.95-1.95-1.95-5.12,0-7.07c1.95-1.95,5.12-1.95,7.07,0c1.71,1.71,1.92,4.35,0.64,6.29l2.9,2.9C20.29,15.69,21,13.38,21,11V5z" fill="white" />
                        <circle cx="12" cy="12" r="3" fill="white"/>
                      </svg>
                    </div>
                    <h2 className="ml-2">Review Plugins</h2>
                  </a>
                </Link>
              </li>
            </>
          )}
          <li className="flex items-center">
            <svg width="240" height="2" viewBox="0 0 302 2" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect opacity="0.12" x="-2" width="304" height="2" fill="white"/>
            </svg>
          </li>
          <li className="p-2 hover:bg-zinc-600">
            <Link href="/">
              <a className="flex items-center">
                <div>
                  <svg width="24" height="24" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.82 20.5H8.18001C7.95194 20.5 7.73071 20.4221 7.55301 20.2792C7.37531 20.1362 7.25181 19.9368 7.20301 19.714L6.79601 17.83C6.25306 17.5921 5.73824 17.2946 5.26101 16.943L3.42401 17.528C3.20657 17.5973 2.97196 17.5902 2.75913 17.5078C2.5463 17.4254 2.36806 17.2727 2.25401 17.075L0.430006 13.924C0.317152 13.7261 0.274789 13.4958 0.309849 13.2708C0.344909 13.0457 0.455315 12.8392 0.623006 12.685L2.04801 11.385C1.9832 10.7961 1.9832 10.2019 2.04801 9.613L0.623006 8.316C0.455078 8.16177 0.344521 7.95507 0.309455 7.72978C0.27439 7.50449 0.316896 7.27397 0.430006 7.076L2.25001 3.923C2.36406 3.72532 2.5423 3.57259 2.75513 3.49019C2.96796 3.40778 3.20257 3.40066 3.42001 3.47L5.25701 4.055C5.50101 3.875 5.75501 3.707 6.01701 3.555C6.27001 3.413 6.53001 3.284 6.79601 3.169L7.20401 1.287C7.25258 1.0642 7.37584 0.864688 7.55335 0.721549C7.73087 0.57841 7.95197 0.50024 8.18001 0.5H11.82C12.048 0.50024 12.2691 0.57841 12.4467 0.721549C12.6242 0.864688 12.7474 1.0642 12.796 1.287L13.208 3.17C13.488 3.294 13.762 3.433 14.027 3.588C14.274 3.731 14.513 3.888 14.743 4.057L16.581 3.472C16.7983 3.40292 17.0327 3.41017 17.2453 3.49256C17.4579 3.57495 17.636 3.72753 17.75 3.925L19.57 7.078C19.802 7.485 19.722 8 19.377 8.317L17.952 9.617C18.0168 10.2059 18.0168 10.8001 17.952 11.389L19.377 12.689C19.722 13.007 19.802 13.521 19.57 13.928L17.75 17.081C17.636 17.2787 17.4577 17.4314 17.2449 17.5138C17.0321 17.5962 16.7974 17.6033 16.58 17.534L14.743 16.949C14.2661 17.3003 13.7516 17.5975 13.209 17.835L12.796 19.714C12.7472 19.9366 12.6239 20.1359 12.4464 20.2788C12.2689 20.4218 12.0479 20.4998 11.82 20.5ZM9.99601 6.5C8.93514 6.5 7.91772 6.92143 7.16758 7.67157C6.41743 8.42172 5.99601 9.43913 5.99601 10.5C5.99601 11.5609 6.41743 12.5783 7.16758 13.3284C7.91772 14.0786 8.93514 14.5 9.99601 14.5C11.0569 14.5 12.0743 14.0786 12.8244 13.3284C13.5746 12.5783 13.996 11.5609 13.996 10.5C13.996 9.43913 13.5746 8.42172 12.8244 7.67157C12.0743 6.92143 11.0569 6.5 9.99601 6.5Z" fill="white"/>
                  </svg>
                </div>
                <h2 className="ml-2">Settings</h2>
              </a>
            </Link>
          </li>
          <li className="p-2 hover:bg-zinc-600">
            <Link href="/">
              <a className="flex items-center">
                <div>
                  <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433284 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C20 8.68678 19.7413 7.38642 19.2388 6.17317C18.7363 4.95991 17.9997 3.85752 17.0711 2.92893C16.1425 2.00035 15.0401 1.26375 13.8268 0.761205C12.6136 0.258658 11.3132 0 10 0ZM10 16C9.80222 16 9.60888 15.9414 9.44443 15.8315C9.27999 15.7216 9.15181 15.5654 9.07613 15.3827C9.00044 15.2 8.98063 14.9989 9.01922 14.8049C9.05781 14.6109 9.15305 14.4327 9.2929 14.2929C9.43275 14.153 9.61093 14.0578 9.80491 14.0192C9.9989 13.9806 10.2 14.0004 10.3827 14.0761C10.5654 14.1518 10.7216 14.28 10.8315 14.4444C10.9414 14.6089 11 14.8022 11 15C11 15.2652 10.8946 15.5196 10.7071 15.7071C10.5196 15.8946 10.2652 16 10 16ZM11 10.84V12C11 12.2652 10.8946 12.5196 10.7071 12.7071C10.5196 12.8946 10.2652 13 10 13C9.73479 13 9.48043 12.8946 9.2929 12.7071C9.10536 12.5196 9 12.2652 9 12V10C9 9.73478 9.10536 9.48043 9.2929 9.29289C9.48043 9.10536 9.73479 9 10 9C10.2967 9 10.5867 8.91203 10.8334 8.7472C11.08 8.58238 11.2723 8.34811 11.3858 8.07403C11.4994 7.79994 11.5291 7.49834 11.4712 7.20736C11.4133 6.91639 11.2704 6.64912 11.0607 6.43934C10.8509 6.22956 10.5836 6.0867 10.2926 6.02882C10.0017 5.97094 9.70007 6.00065 9.42598 6.11418C9.15189 6.22771 8.91762 6.41997 8.7528 6.66665C8.58798 6.91332 8.5 7.20333 8.5 7.5C8.5 7.76522 8.39465 8.01957 8.20711 8.20711C8.01958 8.39464 7.76522 8.5 7.5 8.5C7.23479 8.5 6.98043 8.39464 6.7929 8.20711C6.60536 8.01957 6.5 7.76522 6.5 7.5C6.49739 6.8503 6.67566 6.2127 7.01487 5.65857C7.35408 5.10445 7.84083 4.65568 8.42062 4.3625C9.00042 4.06933 9.65037 3.94332 10.2977 3.99859C10.9451 4.05386 11.5643 4.28823 12.086 4.67545C12.6077 5.06267 13.0113 5.58746 13.2517 6.19107C13.492 6.79467 13.5596 7.45327 13.4469 8.09312C13.3342 8.73297 13.0456 9.32882 12.6134 9.81396C12.1813 10.2991 11.6226 10.6544 11 10.84Z" fill="white"/>
                  </svg>
                </div>
                <h2 className="ml-2">Help</h2>
              </a>
            </Link>
          </li>
          <li className="p-2 hover:bg-zinc-600">
            <Link href="/">
              <a className="flex items-center">
                <div>
                  <svg width="24" height="24" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 0H2C0.897 0 0 0.897 0 2V20L4 16H18C19.103 16 20 15.103 20 14V2C20 0.897 19.103 0 18 0ZM11 13H9V11H11V13ZM11 9H9V3H11V9Z" fill="white"/>
                  </svg>
                </div>
                <h2 className="ml-2">Send Feedback</h2>
              </a>
            </Link>
          </li>
          {AuthUser.claims.accessLevel > 1 && (<li className="flex items-center"><a className="flex items-center">
            <svg width="240" height="1" viewBox="0 0 302 1" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect opacity="0.12" x="-2" width="304" height="1" fill="white"/>
            </svg>
          </a>
          </li>)}
          {AuthUser.claims.accessLevel > 1 && (<li>
            <Link href="/">
              <a className="flex items-center">
                <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24.8044 10.0909L23.8615 9.03016C23.6011 8.73719 23.179 8.73719 22.9186 9.03016L22.4474 9.56031L21.2432 8.20563C21.4778 7.20672 21.2582 6.10094 20.5619 5.31766L18.6765 3.19656C16.0732 0.267813 11.8519 0.267813 9.2482 3.19656L13.0194 5.31766V6.19656C13.0194 6.99203 13.3003 7.75516 13.8007 8.31766L15.8482 10.6211C16.5444 11.4044 17.5274 11.6514 18.4153 11.3875L19.6194 12.7422L19.1482 13.2723C18.8878 13.5653 18.8878 14.0402 19.1482 14.3331L20.0911 15.3939C20.3515 15.6869 20.7736 15.6869 21.034 15.3939L24.8053 11.1512C25.0649 10.8588 25.0649 10.3839 24.8044 10.0909ZM12.8578 9.37844C12.7036 9.205 12.5728 9.01328 12.4474 8.81828L1.8182 19.9825C0.752779 21.1019 0.724029 22.9914 1.75445 24.1511C2.78486 25.3108 4.46486 25.2784 5.45986 24.0794L15.3819 12.123C15.2169 11.9866 15.0528 11.8478 14.9053 11.6819L12.8578 9.37844Z" fill="white"/>
                </svg>
                Review Plugins
              </a>
            </Link>
          </li>)}
          <li className="flex items-center">
            <svg width="240" height="2" viewBox="0 0 302 2" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect opacity="0.12" x="-2" width="304" height="2" fill="white"/>
            </svg>
          </li>
          <li className="absolute bottom-6"><Footer /></li>
        </ul>
      </div>
      <div id="navbar" className="absolute top-0 h-14 w-full px-4 flex align-center justify-between bg-zinc-800 bg-cover drop-shadow-lg">
        <div id="nav-left" className="flex items-center">
          <button className="p-2 flex justify-center">
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M0 12H18V10H0V12ZM0 7H18V5H0V7ZM0 0V2H18V0H0Z" fill="white" fillOpacity="0.87"/>
            </svg>
          </button>
          <Link href="/"><a><h1 className="font-extrabold text-4xl text-slate-500 ml-2">NXT</h1></a></Link>
        </div>
        <div id="nav-center" className="w-3/5 items-center">
          <form method="get" action="/results" className="w-full ml-10 mr-6 mt-2 flex flex-y items-center border border-zinc-900 bg-zinc-900 rounded-lg"
                noValidate>
            <input name="search_query" type="text" className="w-full h-7 ml-0 rounded-l-lg" autoComplete="on" required={true} />
            <button type="submit" className="w-16 flex justify-center" >
              <svg width="72" height="31" viewBox="0 0 72 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_i_116_988)">
                  <rect width="72" height="31" fill="#18181b"/>
                  <path d="M39.5 18H38.71L38.43 17.73C39.41 16.59 40 15.11 40 13.5C40 9.91 37.09 7 33.5 7C29.91 7 27 9.91 27 13.5C27 17.09 29.91 20 33.5 20C35.11 20 36.59 19.41 37.73 18.43L38 18.71V19.5L43 24.49L44.49 23L39.5 18ZM33.5 18C31.01 18 29 15.99 29 13.5C29 11.01 31.01 9 33.5 9C35.99 9 38 11.01 38 13.5C38 15.99 35.99 18 33.5 18Z" fill="#808080"/>
                </g>
                <defs>
                  <filter id="filter0_i_116_988" x="0" y="0" width="72" height="31" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dx="1"/>
                    <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0.698039 0 0 0 0 0.698039 0 0 0 0 0.698039 0 0 0 1 0"/>
                    <feBlend mode="normal" in2="shape" result="effect1_innerShadow_116_988"/>
                  </filter>
                </defs>
              </svg>
            </button>
          </form>
        </div>
        <div id="nav-right" className="min-w-[250px] flex gap-2 items-center justify-end">
          <button className="mr-2 h-6 w-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M12.0898 2.91002C10.0798 0.900015 7.06976 0.490015 4.64976 1.67002L8.98976 6.01002L5.98976 9.01002L1.64976 4.67002C0.479759 7.10002 0.889759 10.09 2.89976 12.1C4.75976 13.96 7.47976 14.45 9.78976 13.58L18.8998 22.69C19.2898 23.08 19.9198 23.08 20.3098 22.69L22.6098 20.39C22.9998 20 22.9998 19.37 22.6098 18.98L13.5398 9.90001C14.4598 7.56001 13.9798 4.80002 12.0898 2.91002Z" fill="white" fillOpacity="0.6"/>
            </svg>
          </button>
          <button className="mr-2 h-6 w-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M4 8H8V4H4V8ZM10 20H14V16H10V20ZM4 20H8V16H4V20ZM4 14H8V10H4V14ZM10 14H14V10H10V14ZM16 4V8H20V4H16ZM10 8H14V4H10V8ZM16 14H20V10H16V14ZM16 20H20V16H16V20Z" fill="white" fillOpacity="0.6"/>
            </svg>
          </button>
          <button className="mr-2 h-6 w-6">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.89 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z" fill="white" fillOpacity="0.6"/>
            </svg>
          </button>
          <button className="h-10 w-10">
            <div className="h-[38px] w-[48px] pt-px pb-px pl-[6px] pr-[6px]">
              <Image src={AuthUser.photoURL || '/missing.png'} width="32px" height="32px" alt="Avatar Image" className="rounded-full" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;