import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";

export function BusinessHours() {
    const today = new Date().toLocaleString('en-us', {  weekday: 'long' });
    const businessHours = [
        { day: "Monday", hours: "10:00 AM - 6:00 PM" },
        { day: "Tuesday", hours: "10:00 AM - 6:00 PM" },
        { day: "Wednesday", hours: "10:00 AM - 6:00 PM" },
        { day: "Thursday", hours: "10:00 AM - 6:00 PM" },
        { day: "Friday", hours: "10:00 AM - 6:00 PM" },
        { day: "Saturday", hours: "10:00 AM - 6:00 PM" },
        { day: "Sunday", hours: "Closed" },
    ];

    return (
        <div className="space-y-3 text-muted-foreground">
            <div className="flex items-start gap-4 p-4 rounded-lg bg-primary/10 border border-primary/20">
                 <FontAwesomeIcon icon={faClock} className="h-5 w-5 mt-1 shrink-0 text-primary" />
                 <div className="flex-1">
                    <p className="font-semibold text-foreground">Open Now</p>
                    <p className="text-sm">Monday - Saturday: 10:00 AM - 6:00 PM</p>
                 </div>
            </div>
            <ul className="space-y-2 pt-2">
                {businessHours.map((item, index) => (
                    <li key={index} className={`flex justify-between items-center ${item.day === today ? 'font-bold text-primary' : ''}`}>
                        <span>{item.day}</span>
                        <span className="font-mono">{item.hours}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
