import { client } from "@/sanity/lib/client";
import Image from "next/image";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}


// Fetch product data dynamically based on ID
export default async function ProductPage({ params }: { params: { id: string } }) {
  const productData = await client.fetch(
    `*[_type == "product" && _id == $id]{
    _id,
      name,
      price,
      description,
      "imageUrl": image.asset->url
    }`,
    { id: params.id }
  );

  if (!productData || productData.length === 0) {
    return <div>Product not found</div>;
  }

  const product: Product = productData[0];

  return (
    <div className="bg-teal-300 min-h-screen flex items-center justify-center">
  <div className="bg-white shadow-lg rounded-lg max-w-4xl mx-auto p-6 md:p-8">
    <h1 className="text-4xl font-extrabold text-gray-800 mb-6 text-center">
      {product.name}
    </h1>
    <div className="md:flex items-start gap-6">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={400}
        height={400}
        className="rounded-lg shadow-md w-full md:w-auto"
      />
      <div className="flex-1 mt-6 md:mt-0">
        <p className="text-2xl font-semibold text-gray-700 mb-4">
          Price: <span className="text-teal-600">${product.price}</span>
        </p>
        <p className="text-gray-600 text-lg leading-relaxed">
          {product.description}
        </p>
        <button className="mt-6 px-6 py-3 bg-teal-500 text-white rounded-lg font-bold shadow-md hover:bg-teal-600 transition duration-200">
          Buy Now
        </button>
      </div>
    </div>
  </div>
</div>

  );
}
