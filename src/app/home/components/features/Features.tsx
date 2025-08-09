import FeatureBar, { FeatureBarProps } from "./FeatureBar";

const features: FeatureBarProps[] = [
    {
        title: "Private Profile Link",
        description: "A fully customizable profile page where you can create your own design!",
        imageUrl: "ss.png",
        items: [
            { text: "Full Customizable Design" },
            { text: "Easy to Use" },
            { text: "Various Design Elements" },
        ]
    },
    {
        title: "Dashboard",
        description: "You can create multiple profile and view statistics of your profiles.",
        imageUrl: "",
        items: [
            { text: "Possibility to Create Multiple Profiles" },
            { text: "Easily Track Profile Performance" },
            { text: "Quick Access to Statistics" },
        ]
    },
    {
        title: "Easy Integration",
        description: "Easily add your social media accounts so visitors can reach you immediately.",
        imageUrl: "",
        items: [
            { text: "Easy Account Adding" },
            { text: "One Click Access" },
            { text: "Current Links" },
        ]
    },
];
export default function Features() {
    return (
        <div id="features" className="container flex flex-col gap-8">
            {features.map((feature, index) => (
                <div key={index}>
                    <FeatureBar {...feature} index={index} />
                </div>
            ))}
        </div>
    )
}