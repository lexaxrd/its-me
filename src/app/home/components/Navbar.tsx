import UserButton from "./UserButton";

export default function Navbar() {
    return (
        <nav className="px-2 pt-8 container flex justify-between items-center">
            <div className="flex items-center gap-2">
                <img src="/itsmelogo.png" alt="" className="" width={45} />
                <h2 className="font-bold text-2xl">ITS.ME</h2>
            </div>
            <ul className="flex gap-8 items-center">
                <a href="/" className="font-medium cursor-pointer hover:text-blue-600 transition-all duration-200">Homepage</a>
                <a href="/#features" className="font-medium cursor-pointer hover:text-blue-600 transition-all duration-200">Features</a>
                <a href="/profiles" className="font-medium cursor-pointer hover:text-blue-600 transition-all duration-200">Profiles</a>
                <UserButton />
            </ul>
        </nav> 
    )
}