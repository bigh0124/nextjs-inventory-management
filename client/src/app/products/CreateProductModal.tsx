"use client";

import React, { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { v4 } from "uuid";
import Header from "../(components)/Header";

type FormDataProps = {
  name: string;
  price: number;
  stockQuantity: number;
  rating: number;
};

type CreateProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (formData: FormDataProps) => void;
};

const CreateProductModal = ({ isOpen, onClose, onCreate }: CreateProductModalProps) => {
  const [formData, setFormData] = useState({
    productId: v4(),
    name: "",
    price: 0,
    stockQuantity: 0,
    rating: 0,
  });

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate(formData);
    setFormData({ productId: v4(), name: "", price: 0, stockQuantity: 0, rating: 0 });
    onClose();
  };

  const numericFields = ["price", "stockQuantity", "rating"];

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: numericFields.includes(name)
        ? value === ""
          ? ""
          : isNaN(parseFloat(value))
          ? 0
          : parseFloat(value)
        : value,
    }));
  };
  const handleCloseClick = (e: MouseEvent<HTMLButtonElement>) => {
    setFormData({ productId: v4(), name: "", price: 0, stockQuantity: 0, rating: 0 });
    onClose();
  };

  const labelCssStyles = "block text-sm font-medium text-gray-700 mb-1";
  const inputCssStyles = "w-full p-2 border-2 border-gray-500 rounded-md outline-none block mb-2";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 bg-gray-600 overflow-y-auto h-full w-full z-20">
      <div className="relative bg-white w-96 p-5 mx-auto top-20 border shadow-lg rounded-md">
        <div className="text-center mb-4">
          <Header name="Create New Product" />
        </div>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="productName" className={labelCssStyles}>
            Product name
          </label>
          <input
            type="text"
            id="productName"
            className={inputCssStyles}
            name="name"
            onChange={handleFormChange}
            value={formData.name}
            required
            autoComplete="off"
          />
          <label htmlFor="price" className={labelCssStyles}>
            Price
          </label>
          <input
            type="number"
            id="price"
            className={inputCssStyles}
            name="price"
            onChange={handleFormChange}
            value={formData.price}
            required
            autoComplete="off"
            min={0}
            step="0.01"
          />
          <label htmlFor="stockQuantity" className={labelCssStyles}>
            Stock Quantity
          </label>
          <input
            type="number"
            id="stockQuantity"
            className={inputCssStyles}
            name="stockQuantity"
            onChange={handleFormChange}
            value={formData.stockQuantity}
            autoComplete="off"
            required
            min={0}
          />
          <label htmlFor="rating" className={labelCssStyles}>
            Rating
          </label>
          <input
            type="number"
            id="rating"
            className={inputCssStyles}
            name="rating"
            onChange={handleFormChange}
            autoComplete="off"
            value={formData.rating}
            required
            min={0}
            max={5}
            step="0.1"
          />
          <div className="flex items-center mt-3 justify-between">
            <button type="submit" className="py-2 px-4 text-white bg-blue-500 rounded">
              Create
            </button>
            <button type="button" className="py-2 px-4 text-white bg-gray-500 rounded" onClick={handleCloseClick}>
              Cancle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProductModal;
