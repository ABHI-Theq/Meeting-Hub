import { Link } from "react-router-dom"

const Header = () => {
  return (
    <div className="bg-base-300  shadow-md shadow-base-500  px-4 py-2">
    <div className="flex justify-center items-center gap-x-10 ">
        <div className="sm:text-sm md:text-md lg:text-lg xl:text-xl font-mono p-4 hover:underline">
            <Link to="/">Home</Link>            
        </div>
        <div className=" sm:text-sm md:text-md lg:text-lg xl:text-xl font-mono p-4 hover:underline">
            <Link to="/about">About</Link> 
        </div>
        <div className="sm:text-sm md:text-md lg:text-lg xl:text-xl font-mono p-4 hover:underline">
           <Link to="/contactus"> Contact Us</Link>
        </div>
        <div className=" bg-base-100 hover:bg-base-200  rounded-2xl sm:text-sm md:text-md lg:text-lg xl:text-xl font-mono py-3 px-4 hover:underline">
            <Link to="/">Logout</Link>
        </div>
    </div>
    </div>
  )
}

export default Header