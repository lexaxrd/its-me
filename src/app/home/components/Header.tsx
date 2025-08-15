export default function Header() {
    return (
        <div className="flex max-lg:justify-center max-lg:text-center justify-between items-center container">
            <div className="flex max-lg:items-center flex-col gap-8">
                <h1 className="font-black text-5xl leading-tight w-[400px]">LET ITS.ME HELP
                    OTHERS DISCOVER WHO 
                    YOU ARE
                </h1>
                <p className="font-medium text-xl"> ITS.ME is a platform where you can easily introduce to <br />
                 people and customize your profile however you want </p>
                 <button className="bg-[#3273FF] w-max text-white px-7 py-3 font-medium rounded-lg hover:bg-blue-700 transition-all duration-300 cursor-pointer">
                    Create your profile
                </button>
            </div>
            <div className="max-lg:hidden">
                <img src="/people.png" alt="Header Image" width={500} className="" />
            </div>
        </div>
    );
}