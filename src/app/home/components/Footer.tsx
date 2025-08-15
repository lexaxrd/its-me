import { FaMailBulk } from "react-icons/fa";
import { FaDiscord, FaGithub } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export default function Footer() {
    return (
        <footer className="bg-[#F9F9F9] py-24 border-t border-[rgba(0,0,0,0.14)]">
            <div className="container flex sm:flex-row max-sm:text-center max-sm:justify-center gap-10 flex-col justify-between items-center">
                <div className="flex flex-col gap-2">
                    <div className="flex gap-3 max-sm:justify-center items-center">
                        <img src="/itsmelogo.png" alt="" width={50} />
                        <h1 className="font-black text-4xl">ITS.ME</h1>
                    </div>
                    <p>It's an open source profile design project.</p>
                    <p>developed by <span className="font-bold">lexaxrd</span></p>
                </div>
                <div className="flex gap-2 text-4xl">
                    <a href=""><FaDiscord className="transition-transform duration-400 ease-in-out hover:rotate-[360deg] cursor-pointer" /></a>
                    <a href=""><FaGithub className="transition-transform duration-400 ease-in-out hover:rotate-[360deg] cursor-pointer" /></a>
                    <a href=""><MdEmail className="transition-transform duration-400 ease-in-out hover:rotate-[360deg] cursor-pointer" /></a>
                </div>
            </div>
        </footer>
    );
}