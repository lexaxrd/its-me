import { FaCircleCheck } from "react-icons/fa6";

export type FeatureBarProps = {
    title: string;
    description: string;
    imageUrl: string;
    items: {
        text: string;
    }[];
    index?: number;
}

export default function FeatureBar({ title, description, imageUrl, items, index }: FeatureBarProps) {

    const isOdd = typeof index === 'number' && index % 2 === 1;

    const featureContent = (
        <div className="w-[50%] h-full flex flex-col gap-8">
            <h1 className="font-bold text-4xl"> {title} </h1>
            <p className="text-xl"> {description} </p>
            <ul className="flex flex-col gap-1">
                {items.map((item, idx) => (
                    <li key={idx} className="flex gap-3 items-center text-xl">
                        <FaCircleCheck className="text-green-400" />
                        <p>{item.text}</p>
                    </li>
                ))}
            </ul>
        </div>
    );

    const imageContent = (
        <div className="w-[50%] h-full">
            <img src={`/featuresImages/${imageUrl}`} alt="" className="w-full h-full rounded-lg" />
        </div>
    );

    return (
        <div className="flex rounded-2xl p-12 gap-10 bg-gradient-to-r from-[#F9F9F9] to-[#FFFFFF] border border-[rgba(0,0,0,0.14)]">
            {isOdd ? (
                <>
                    {imageContent}
                    {featureContent}
                </>
            ) : (
                <>
                    {featureContent}
                    {imageContent}
                </>
            )}
        </div>
    );
}