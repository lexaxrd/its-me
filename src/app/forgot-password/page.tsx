export default function ForgotPassword() {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen">
            <div className="flex items-center gap-3">
                <img src="/itsmelogo.png" alt="" width={55} />
                <h1 className="font-bold text-4xl">ITS.ME</h1>
            </div>
            <div className="mt-8 mb-4 flex flex-col gap-4 p-6 px-10 rounded-lg border border-[rgb(0,0,0,0.14)] bg-gradient-to-r from-[#F9F9F9] to-[#FFFFFF] max-w-[400px]">
                <h1 className="font-bold text-4xl">Recover Account</h1>
                <div className="mt-4 flex flex-col gap-1 w-[300px]">
                    <p className="font-medium">Email</p>
                    <input type="text" placeholder="yourmail@its.me" className="bg-[#F3F3F3] transition duration-200 outline-none border-2 border-transparent focus:border-blue-600 rounded-lg w-full p-3" />
                </div>
                <button className="rounded-lg bg-[#3273FF] border-2 border-transparent hover:bg-transparent hover:border-blue-600 transition duration-200 text-white hover:text-blue-600 py-3 cursor-pointer text-[1.10rem] mb-4"> Send Recovery E-mail </button>

            </div>
            <div>
                <a href="/login"> Did you remember your password? <span className="cursor-pointer text-blue-600 hover:underline">Log in</span> </a>
            </div>
        </div>
    );

}