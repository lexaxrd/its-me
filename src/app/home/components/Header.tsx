export default function Header() {
    return (
        <div className="flex justify-between items-center container">
            <div className="flex flex-col gap-8">
                <h1 className="font-black text-5xl leading-tight">LET ITS.ME HELP <br />
                    OTHERS DISCOVER WHO <br />
                    YOU ARE
                </h1>
                <p className="font-medium text-xl"> ITS.ME is a platform where you can easily introduce to <br />
                 people and customize your profile however you want </p>
                 <button className="bg-[#3273FF] w-max text-white px-7 py-3 font-medium rounded-lg hover:bg-blue-700 transition-all duration-300 cursor-pointer">
                    Create your profile
                </button>
            </div>
            <div>
                <img src="/people.png" alt="Header Image" width={500} className="" />
            </div>
        </div>
    );
}