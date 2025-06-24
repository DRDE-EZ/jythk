import { products } from "@wix/stores";
import { Button, ButtonProps } from "./ui/button";
import { useCreateBackInStockNotificationRequest } from "@/hooks/back-in-stock";
import { z } from "zod";
import { requiredString } from "@/lib/valitation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import LoadingButton from "./LoadingButton";
import { env } from "@/env";

const formSchema = z.object({
  email: requiredString.email(),
});

type FormValues = z.infer<typeof formSchema>;

interface BackInStockNotificationButtonProps extends ButtonProps {
  product: products.Product;
  selectedOptions: Record<string, string>;
}

export default function BackInStockNotificationButton({
  product,
  selectedOptions,
  ...props
}: BackInStockNotificationButtonProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const mutation = useCreateBackInStockNotificationRequest();

  async function onSubmit({ email }: FormValues) {
    mutation.mutate({
      email,
      product,
      itemUrl: env.NEXT_PUBLIC_BASE_URL + "/products/" + product.slug,
      selectedOptions,
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button {...props} className="text-lg rounded-xs hover:cursor-pointer">
          Notify when available
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-xs">
        <DialogHeader>
          <DialogTitle>Notify when available</DialogTitle>
          <DialogDescription>
            Enter your email and we will let you know when the product is back
            in stock.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      className="rounded-xs"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <LoadingButton
              type="submit"
              loading={mutation.isPending}
              className="rounded-xs hover:cursor-pointer"
            >
              Notify me
            </LoadingButton>
          </form>
        </Form>
        {mutation.isSuccess && (
          <div className="py-2.5 text-green-500">
            Thank you! We will notify you when this product is available!
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
