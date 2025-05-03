import React, { useEffect, useState } from "react";
import OrderStatusGraph from "./components/OrderStatusGraph";
import ProductCountGraph from "./components/ProductCountGraph";
import ProductsTable from "./components/ProductsTable";
import { Button } from "@/components/ui/button";
import CreateProductModal from "./components/CreateProductModal";
import ProductTiles from "./components/ProductTiles";
import { useDispatch, useSelector } from "react-redux";
import { GetProductCounts } from "@/store/features/product/product.slice";
import { GetOrdersCount } from "@/store/features/order/order.slice";

function index() {
  const dispatch = useDispatch();
  const { productCount } = useSelector((state) => state.product);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    dispatch(GetProductCounts());
    dispatch(GetOrdersCount());
  }, []);

  return (
    <div className="w-full">
      <ProductTiles />
      <div className="flex mt-5 gap-2 flex-col lg:flex-row w-[90%] m-auto">
        <div className="w-[100%] lg:w-[70%]">
          <ProductCountGraph />
        </div>
        <div className="w-[100%] lg:w-[30%] py-4">
          <OrderStatusGraph />
        </div>
      </div>
      <div className="w-[90%] m-auto mt-5 mb-5 pb-3">
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-xl font-bold">Recently Added products</h1>
          <Button
            className="bg-black text-white hover:bg-gray-900"
            onClick={() => setOpenModal(true)}
          >
            Add New Product
          </Button>
        </div>
        <ProductsTable />
        <CreateProductModal open={openModal} setOpen={setOpenModal} />
      </div>
    </div>
  );
}

export default index;
