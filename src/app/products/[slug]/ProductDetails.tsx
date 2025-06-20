"use client";

import { Button } from "@/components/ui/button";
import { products } from "@wix/stores";
import ProductOptions from "./ProductOptions";
import { useState } from "react";
import { checkInStock, findVariant } from "@/lib/utils";
import { FaDollarSign } from "react-icons/fa";
import ProductMedia from "./ProductMedia";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { InfoIcon } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AddToCartButton from "@/components/AddToCartButton";

export default function ProductDetails({
  product,
}: {
  product: products.Product;
}) {
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >(
    product.productOptions
      ?.map((option) => ({
        [option.name || ""]: option.choices?.[0]?.value || "",
      }))
      ?.reduce(
        (acc, curr) => ({
          ...acc,
          ...curr,
        }),
        {}
      ) || {}
  );

  const [quantity, setQuantity] = useState(1);

  const selectedVariant = findVariant(product, selectedOptions);
  const inStock = checkInStock(product, selectedOptions);

  const option = selectedOptions.Builds.split("/");

  const selectedOptionsMedia = product.productOptions?.flatMap((option) => {
    const selectedChoice = option.choices?.find(
      (choice) => choice.description === selectedOptions[option.name || ""]
    );

    return selectedChoice?.media?.items ?? [];
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Image Section */}
        <ProductMedia
          media={
            !!selectedOptionsMedia?.length
              ? selectedOptionsMedia
              : product.media?.items
          }
        />

        {/* Product Info Section */}
        <div className="flex mt-3 lg:mt-0 flex-col justify-start space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>
          </div>
          {/* Price Section */}
          <div className="flex items-center space-x-3">
            {selectedVariant?.variant?.priceData?.formatted?.price ===
            selectedVariant?.variant?.priceData?.formatted?.discountedPrice ? (
              <p className="text-xl sm:text-2xl font-semibold text-gray-800">
                {selectedVariant?.variant?.priceData?.formatted?.price}
              </p>
            ) : (
              <div className="flex items-center space-x-3">
                <span className="text-lg sm:text-xl text-gray-400 line-through">
                  {selectedVariant?.variant?.priceData?.formatted?.price}
                </span>
                <span className="text-xl sm:text-2xl font-semibold text-red-600">
                  {
                    selectedVariant?.variant?.priceData?.formatted
                      ?.discountedPrice
                  }
                </span>
              </div>
            )}
          </div>
          <ProductOptions
            product={product}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          />
          <div className="space-y-3 -mt-5">
            <Label htmlFor="quantity">Quantity</Label>
            <div className="flex items-center gap-2.5">
              <Input
                name="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.valueAsNumber)}
                className="w-24 rounded-none"
                disabled={!inStock}
              />
            </div>
          </div>
          {/* {product.additionalInfoSections?.[0]?.description && (
            <div>
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                Default Build
              </h2>
              <div className="prose prose-gray max-w-none lg:mt-4">
                <div
                  className="text-gray-600 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: product.additionalInfoSections[0].description,
                  }}
                />
              </div>
            </div>
          )} */}
          {/* Add to Cart Button */}
          <AddToCartButton
            product={product}
            selectedOptions={selectedOptions}
            quantity={quantity}
            className="w-full sm:w-auto sm:min-w-[200px] px-8 text-lg font-medium rounded-none transition-all duration-200 hover:shadow-lg hover:cursor-pointer"
          />
          {/* Buy Button */}
          <Button
            variant="default"
            className="w-full sm:w-auto sm:min-w-[200px] px-8 text-lg font-medium rounded-none transition-all duration-200 hover:shadow-lg hover:cursor-pointer"
          >
            <FaDollarSign />
            Buy now
          </Button>
          {/* Social Media Links */}
          <div className="pt-4">
            <p className="text-sm font-medium text-gray-700 mb-3">Share:</p>
            <ul className="flex items-center space-x-4">
              <li>
                <a
                  href="#"
                  title="Share on Twitter"
                  className="flex w-9 h-9 items-center justify-center rounded-full bg-gray-800 text-white transition-all duration-200 hover:bg-blue-500 hover:scale-110 focus:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z"></path>
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  title="Share on Facebook"
                  className="flex w-9 h-9 items-center justify-center rounded-full bg-gray-800 text-white transition-all duration-200 hover:bg-blue-600 hover:scale-110 focus:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                >
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  title="Share on Instagram"
                  className="flex w-9 h-9 items-center justify-center rounded-full bg-gray-800 text-white transition-all duration-200 hover:bg-pink-500 hover:scale-110 focus:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                >
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M11.999 7.377a4.623 4.623 0 1 0 0 9.248 4.623 4.623 0 0 0 0-9.248zm0 7.627a3.004 3.004 0 1 1 0-6.008 3.004 3.004 0 0 1 0 6.008z"></path>
                    <circle cx="16.806" cy="7.207" r="1.078"></circle>
                    <path d="M20.533 6.111A4.605 4.605 0 0 0 17.9 3.479a6.606 6.606 0 0 0-2.186-.42c-.963-.042-1.268-.054-3.71-.054s-2.755 0-3.71.054a6.554 6.554 0 0 0-2.184.42 4.6 4.6 0 0 0-2.633 2.632 6.585 6.585 0 0 0-.419 2.186c-.043.962-.056 1.267-.056 3.71 0 2.442 0 2.753.056 3.71.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.042 1.268.055 3.71.055s2.755 0 3.71-.055a6.615 6.615 0 0 0 2.186-.419 4.613 4.613 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.186.043-.962.056-1.267.056-3.71s0-2.753-.056-3.71a6.581 6.581 0 0 0-.421-2.217zm-1.218 9.532a5.043 5.043 0 0 1-.311 1.688 2.987 2.987 0 0 1-1.712 1.711 4.985 4.985 0 0 1-1.67.311c-.95.044-1.218.055-3.654.055-2.438 0-2.687 0-3.655-.055a4.96 4.96 0 0 1-1.669-.311 2.985 2.985 0 0 1-1.719-1.711 5.08 5.08 0 0 1-.311-1.669c-.043-.95-.053-1.218-.053-3.654 0-2.437 0-2.686.053-3.655a5.038 5.038 0 0 1 .311-1.687c.305-.789.93-1.41 1.719-1.712a5.01 5.01 0 0 1 1.669-.311c.951-.043 1.218-.055 3.655-.055s2.687 0 3.654.055a4.96 4.96 0 0 1 1.67.311 2.991 2.991 0 0 1 1.712 1.712 5.08 5.08 0 0 1 .311 1.669c.043.951.054 1.218.054 3.655 0 2.436 0 2.698-.043 3.654h-.011z"></path>
                  </svg>
                </a>
              </li>

              <li>
                <a
                  href="#"
                  title="Share on GitHub"
                  className="flex w-9 h-9 items-center justify-center rounded-full bg-gray-800 text-white transition-all duration-200 hover:bg-gray-700 hover:scale-110 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2"
                >
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.026 2c-5.509 0-9.974 4.465-9.974 9.974 0 4.406 2.857 8.145 6.821 9.465.499.09.679-.217.679-.481 0-.237-.008-.865-.011-1.696-2.775.602-3.361-1.338-3.361-1.338-.452-1.152-1.107-1.459-1.107-1.459-.905-.619.069-.605.069-.605 1.002.07 1.527 1.028 1.527 1.028.89 1.524 2.336 1.084 2.902.829.091-.645.351-1.085.635-1.334-2.214-.251-4.542-1.107-4.542-4.93 0-1.087.389-1.979 1.024-2.675-.101-.253-.446-1.268.099-2.64 0 0 .837-.269 2.742 1.021a9.582 9.582 0 0 1 2.496-.336 9.554 9.554 0 0 1 2.496.336c1.906-1.291 2.742-1.021 2.742-1.021.545 1.372.203 2.387.099 2.64.64.696 1.024 1.587 1.024 2.675 0 3.833-2.33 4.675-4.552 4.922.355.308.675.916.675 1.846 0 1.334-.012 2.41-.012 2.737 0 .267.178.577.687.479C19.146 20.115 22 16.379 22 11.974 22 6.465 17.535 2 12.026 2z"
                    ></path>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {!!product.description && (
        <div className="space-y-1.5 text-lg text-muted-foreground pt-16">
          <span className="flex items-center gap-2">
            <InfoIcon className="size-7 -mt-1" />
            <span>Product information</span>
          </span>
          <Accordion type="multiple" defaultValue={["description"]}>
            <AccordionItem value="description">
              <AccordionTrigger className="text-md hover:cursor-pointer">
                Description
              </AccordionTrigger>
              <AccordionContent>
                <div
                  dangerouslySetInnerHTML={{
                    __html: product.description || "",
                  }}
                  className="prose text-sm text-muted-foreground"
                />
              </AccordionContent>
            </AccordionItem>
            {!!product.additionalInfoSections?.length &&
              product.additionalInfoSections.map((section) => (
                <AccordionItem value={section.title || ""} key={section.title}>
                  <AccordionTrigger className="text-md hover:cursor-pointer">
                    {section.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: section.description || "",
                      }}
                      className="prose text-sm text-muted-foreground"
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </div>
      )}
    </div>
  );
}
