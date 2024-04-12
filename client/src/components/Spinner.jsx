import React from 'react'

export const Spinner = () => {
  return (
    
<div role="status" className='flex justify-center items-center'>
    <svg aria-hidden="true" class="w-[30%] h-[30%] text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>

  )
}



// import { useLocation, Link } from "react-router-dom";
// import { disablePageScroll, enablePageScroll } from "scroll-lock";
// import { navigation } from "../constants/index";
// import jeep from "../assets/jeep.svg";
// import Button from "./design/Button";
// import { IoList } from "react-icons/io5";
// import { HamburgerMenu } from "./design/Hamburger";
// import { useState } from "react";

// const Header = () => {
//   const pathname = useLocation();
//   const [openNavigation, setOpenNavigation] = useState(false);

//   const toggleNavigation = () => {
//     if (openNavigation) {
//       setOpenNavigation(false);
//       enablePageScroll();
//     } else {
//       setOpenNavigation(true);
//       disablePageScroll();
//     }
//   };

//   const handleClick = () => {
//     if (!openNavigation) return;

//     enablePageScroll();
//     setOpenNavigation(false);
//   };

//   return (
//     <>
//       <div
//         className={`fixed top-0 left-0 w-full z-50 lg:backdrop-blur-sm ${
//           openNavigation ? "overflow-hidden" : "bg-n-8/90 backdrop-blur-sm"
//         }`}
//       >
//         <div className="flex flex-row items-center px-20 lg:px-7.5 xl:px-10 max-lg:py-4">
//           <Link to="/">
//             <img src={jeep} width={55} height={55} alt="jeep" />
//           </Link>
//           <nav
//             className={`${
//               openNavigation ? "flex" : "hidden"
//             } fixed top-[5rem] left-0 right-0 bottom-0 lg:static lg:flex lg:mx-auto lg:bg-transparent`}
//           >
//             <div className="relative z-2 flex flex-col items-center justify-center m-auto lg:flex-row">
//               {navigation.map((item) => (
//                 <Link to={item.url} key={item.id} onClick={handleClick}>
//                   <span
//                     className={`block relative font-code text-2xl uppercase transition-colors ${
//                       item.onlyMobile ? "lg:hidden" : ""
//                     } px-6 py-6 md:py-8 lg:-mr-0.25 lg:text-xs lg:font-semibold ${
//                       item.url === pathname.hash ? "z-2" : " "
//                     }
//                  lg:leading-5 lg:hover:text-n-1 xl:px-12`}
//                   >
//                     {item.title}
//                   </span>
//                 </Link>
//               ))}
//             </div>
//             <HamburgerMenu />
//           </nav>
//           <Link to="#signup" className="button hidden mr-8 font-bold transition-colors hover:text-n-1 lg:block">
//             New account
//           </Link>
//           <Button className="hidden lg:flex" href="#login">
//             Log In
//           </Button>

//           <Button className="ml-auto lg:hidden" px="px-3" onClick={toggleNavigation}>
//             <IoList size={33} />
//           </Button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Header;


