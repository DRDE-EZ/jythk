import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const metadata = {
  title: "Custom Quote | Formex Construction & Wholesale",
  description: "Request a custom quote for your next construction project.",
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-bold mb-4 text-primary">Request a Custom Quote</h1>
      <p className="mb-8 text-muted-foreground">
        Tell us about your dream project and our team will get back to you with a tailored quote and expert advice.
      </p>
      <form className="space-y-6" action="#" method="POST">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name
          </label>
          <Input id="name" name="name" type="text" required placeholder="Your Name" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <Input id="email" name="email" type="email" required placeholder="you@email.com" />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1">
            Phone (optional)
          </label>
          <Input id="phone" name="phone" type="tel" placeholder="+421..." />
        </div>
        <div>
          <label htmlFor="project" className="block text-sm font-medium mb-1">
            Project Details
          </label>
          <Textarea id="project" name="project" rows={5} required placeholder="Describe your project, needs, timeline, and any specifics..." />
        </div>
        <Button type="submit" className="w-full text-lg font-semibold mt-4">
          Request Quote
        </Button>
      </form>
    </div>
  );
}