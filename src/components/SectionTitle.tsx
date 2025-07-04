import Link from "next/link";

export default function SectionTitle({
  title,
  href,
}: {
  title: string;
  href?: string;
}) {
  return (
    <Link href={`${href}`} className="group inline-block w-fit">
      <h1 className="relative text-primary text-7xl mb-8 font-medium tracking-tight pl-0 group-hover:pl-8 transition-all duration-300 group-hover:translate-x-2">
        <span className="absolute left-0 top-1/2 h-[2px] w-0  bg-primary transition-all duration-300 group-hover:w-6 transform -translate-y-1/2" />
        {title}
      </h1>
    </Link>
  );
}
