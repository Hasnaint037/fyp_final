import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DeleteProduct,
  GetAllProduct,
  GetProductCounts,
  reset,
} from "@/store/features/product/product.slice";
import { MoreHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, Toaster } from "sonner";
import Swal from "sweetalert2";
import CreateProductModal from "./CreateProductModal";
import { motion } from "framer-motion"; // Importing motion from Framer Motion

function ProductsTable() {
  const dispatch = useDispatch();
  const { allProducts, allProductLoading } = useSelector(
    (state) => state.product
  );
  const [openModal, setOpenModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState();

  function moveToNext(response) {
    if (response.success) {
      toast.success(response.message);
      dispatch(GetAllProduct());
      dispatch(GetProductCounts());
    } else {
      toast.error(response);
      dispatch(reset());
    }
  }

  function deleteProduct(id) {
    Swal.fire({
      title: "Do you want to delete this product?",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton:
          "bg-[#FF5733] text-white px-4 py-2 rounded hover:bg-[#FF3F00] me-2",
        cancelButton:
          "bg-[#242323] text-white px-4 py-2 rounded hover:bg-[#1a1a1a]",
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(DeleteProduct({ id, moveToNext }));
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

  function editProduct(product) {
    setProductToEdit(product);
    setOpenModal(true);
  }

  useEffect(() => {
    if (allProducts.length === 0) {
      dispatch(GetAllProduct());
    }
    return () => {
      setProductToEdit(null);
      setOpenModal(false);
    };
  }, []);

  return (
    <>
      <Toaster />
      <div className="px-1 py-2 border shadow-lg rounded-lg mb-3">
        {allProductLoading ? (
          "Loading"
        ) : (
          <Table>
            <TableHeader className="bg-[#0d696f] text-white">
              <TableRow>
                <TableHead className="text-left">Name</TableHead>
                <TableHead className="text-left">Price</TableHead>
                <TableHead className="text-left">Status</TableHead>
                <TableHead className="text-left">Created At</TableHead>
                <TableHead className="text-left">Created By</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allProducts?.map((product) => (
                <motion.tr
                  key={product._id}
                  className="hover:bg-gray-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <TableCell className="font-medium">{product?.name}</TableCell>
                  <TableCell>{product?.price}</TableCell>
                  <TableCell>
                    <Badge
                      variant={product.quantity !== 0 ? "default" : "outline"}
                      className={
                        product.quantity !== 0
                          ? "bg-[#457AEE] text-white rounded-full hover:bg-[#1FFAE2] transition duration-300"
                          : "rounded-full"
                      }
                    >
                      {product?.quantity === 0 ? "Out of Stock" : "In Stock"}
                    </Badge>
                  </TableCell>
                  <TableCell>{product.createdAt.split("T")[0]}</TableCell>
                  <TableCell className="text-green-700 font-semibold">
                    {product?.createdBy}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-[#1FFAE2] text-white shadow-xl rounded-lg"
                      >
                        <DropdownMenuItem>View</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => editProduct(product)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => deleteProduct(product._id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        )}
        <CreateProductModal
          open={openModal}
          setOpen={setOpenModal}
          productToEdit={productToEdit}
          setProductToEdit={setProductToEdit}
        />
      </div>
    </>
  );
}

export default ProductsTable;
