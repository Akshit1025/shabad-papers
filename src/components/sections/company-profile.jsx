import Image from "next/image";
import { companyInfo } from "@/lib/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdCard, faGavel, faCalendarCheck, faUsers, faBuilding, faUserTie, faFileInvoiceDollar } from "@fortawesome/free-solid-svg-icons";


const profileItems = [
    { icon: faIdCard, label: "Nature of Business", value: companyInfo.businessNature },
    { icon: faGavel, label: "Legal Status of Firm", value: companyInfo.status },
    { icon: faCalendarCheck, label: "Year of Establishment", value: companyInfo.establishmentYear },
    { icon: faUsers, label: "Total Number of Employees", value: "2 to 11" },
    { icon: faBuilding, label: "Legal Name of Firm", value: companyInfo.legalName },
    { icon: faUserTie, label: "Partners", value: companyInfo.partners },
    { icon: faFileInvoiceDollar, label: "GSTN", value: companyInfo.gstin },

];

export function CompanyProfile() {
    return (
        <section className="py-16 md:py-24 bg-secondary">
            <div className="container">
                <div className="max-w-3xl mx-auto text-center mb-12">
                    <h2 className="text-3xl font-headline font-bold md:text-4xl text-primary">
                        Company Profile
                    </h2>
                    <div className="mt-4 w-24 h-1 bg-primary mx-auto"></div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="animate-fade-in-up">
                        <Image
                            src="https://placehold.co/600x450.png"
                            alt="Paper rolls"
                            data-ai-hint="paper rolls factory"
                            width={600}
                            height={450}
                            className="rounded-lg shadow-2xl object-cover"
                        />
                    </div>
                    <div className="animate-fade-in-up animation-delay-300">
                        <ul className="space-y-4">
                            {profileItems.map((item, index) => (
                                <li key={index} className="flex items-start gap-4">
                                    <FontAwesomeIcon icon={item.icon} className="h-6 w-6 text-primary mt-1" />
                                    <div>
                                        <p className="font-semibold text-foreground">{item.label}</p>
                                        <p className="text-muted-foreground">{item.value}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
