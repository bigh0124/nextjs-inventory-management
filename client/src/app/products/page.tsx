"use client";

import { useCreateProductMutation, useGetProductsQuery } from "@/state/api";
import { useState } from "react";
import Header from "../(components)/Header";
import { PlusCircleIcon, SearchIcon } from "lucide-react";
import Rating from "../(components)/Rating";
import CreateProductModal from "./CreateProductModal";

type ProductFormData = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: products, isError, isLoading } = useGetProductsQuery(searchTerm);
  const [createProduct] = useCreateProductMutation();
  const handleCreateProduct = async (productData: ProductFormData) => {
    await createProduct(productData);
  };

  if (isLoading) return <div className="py-4">Loading...</div>;

  if (!products || isError)
    return <div className="text-center text-red-500 py-4 text-lg">Failed to fetch products</div>;

  return (
    <div className="mx-auto pb-5 w-full">
      <div className="mb-6">
        <div className="flex items-center border-2 rounded border-gray-200">
          <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
          <input
            className="w-full py-2 px-4 rounded bg-white outline-none"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-between items-center mb-6">
        <Header name="Products" />
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-gray-200 font-bold py-2 px-4 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircleIcon className="w-5 h-5 !text-gray-200 mr-2" />
          Create Product
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 justify-between">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          products?.map((product) => {
            return (
              <div key={product.productId} className="border p-4 rounded shadow w-full max-w-full">
                <div className="flex flex-col items-center">
                  img
                  <h3 className="text-lg text-gray-900 font-semibold">{product.name}</h3>
                  <p className="text-gray-800">${product.price}</p>
                  <div className="text-sm text-gray-600 mt-1">Stock: {product.stockQuantity}</div>
                  <div className="flex items-center mt-2">
                    <Rating rating={product.rating} />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
      <CreateProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onCreate={handleCreateProduct} />
    </div>
  );
};

export default Products;
