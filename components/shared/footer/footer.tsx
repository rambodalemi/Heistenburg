import { Separator } from "@/components/ui/separator";
import {


} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaDiscord } from "react-icons/fa";

const footerLinks = [
  {
    title: "Overview",
    href: "#",
  },
  {
    title: "Features",
    href: "#",
  },
  {
    title: "Pricing",
    href: "#",
  },
  {
    title: "Careers",
    href: "#",
  },
  {
    title: "Help",
    href: "#",
  },
  {
    title: "Privacy",
    href: "#",
  },
];

const Footer = () => {
  return (
    <footer className="m-4 max-w-[90%] mx-auto border rounded-xl p-5">
      <div className="p-12 flex flex-col justify-start items-center">
        <Image src="/Logotext.png" width={120} height={100} alt="Logo" />
        <ul className="mt-6 flex items-center gap-4 flex-wrap">
          {footerLinks.map(({ title, href }) => (
            <li key={title}>
              <Link
                href={href}
                className="text-muted-foreground hover:text-foreground font-medium"
              >
                {title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Separator />
      <div className="py-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-x-2 gap-y-5 px-6 xl:px-0">
        {/* Copyright */}
        <span className="text-muted-foreground">
          &copy; {new Date().getFullYear()}{" "}
          <Link href="https://rambodalemi.com" target="_blank">
            Heistenburg
            . All rights reserved.
          </Link>
        </span>

        <div className="flex items-center gap-5 text-muted-foreground">
          <Link href="/discord" target="_blank">
            <FaDiscord className="h-5 w-5" />
          </Link>
        </div>
      </div>

    </footer>
  );
};

export default Footer;
