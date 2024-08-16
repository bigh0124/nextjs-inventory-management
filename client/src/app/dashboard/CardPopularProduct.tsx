import Rating from "@/app/(components)/Rating";
import { useGetDashboardMetricsQuery } from "@/state/api";
import { ShoppingBag } from "lucide-react";
import numeral from "numeral";

const CardPopularProduct = () => {
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();

  //format number. 10,000 => 10k
  const formatNumber = (value: number): string => {
    return numeral(value).format("0a");
  };

  return (
    <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl pb-16">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          <h3 className="text-lg font-semibold px-7 pt-5 pb-2">Popular Products</h3>
          <hr />
          <div className="h-full overflow-auto">
            {dashboardMetrics?.popularProducts.map((product) => {
              return (
                <div key={product.productId} className="flex justify-between items-center gap-3 px-5 py-7 border-b">
                  <div className="flex gap-3 items-center">
                    <div>Image</div>
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-gray-700">{product.name}</span>
                      <div className="flex gap-2 items-center">
                        <span className="font-bold text-blue-500 text-sm">${product.price}</span>
                        <hr className="w-0 h-4 border border-solid border-gray-700" />
                        <div className="flex items-center">
                          <Rating rating={product.rating} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 items-center text-xs font-semibold">
                    <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                      <ShoppingBag size={16} />
                    </div>
                    <span>{formatNumber(Math.round(product.stockQuantity))} Sold</span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default CardPopularProduct;
