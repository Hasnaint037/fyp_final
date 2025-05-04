import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast, Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import {
  CreateProduct,
  GetAllProduct,
  GetProductCounts,
  reset,
  UpdateProduct,
} from "@/store/features/product/product.slice";
import Loader from "@/components/static/Loader";

function CreateProductModal({
  open,
  setOpen,
  productToEdit,
  setProductToEdit,
}) {
  const dispatch = useDispatch();
  const { createProductLoading, updateProductLoading } = useSelector(
    (state) => state?.product
  );
  const formdata = new FormData();
  const [title, setTitle] = useState();
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();
  const [image, setImage] = useState();
  const [description, setDescription] = useState();
  const [category, setCategory] = useState("");

  function moveToNext(response) {
    if (response.success) {
      toast.success(response.message);
      dispatch(GetAllProduct());
      dispatch(GetProductCounts());
      setOpen(false);
      setProductToEdit(null);
    } else {
      toast.error(response);
      dispatch(reset());
    }
  }

  const addProduct = () => {
    formdata.append("name", title);
    formdata.append("description", description);
    formdata.append("price", price);
    formdata.append("quantity", quantity);
    if (image) {
      formdata.append("image", image);
    }
    formdata.append("category", category);
    if (productToEdit) {
      formdata.append("id", productToEdit?._id);
      dispatch(UpdateProduct({ payload: formdata, moveToNext }));
      return;
    }
    dispatch(CreateProduct({ payload: formdata, moveToNext }));
  };

  useEffect(() => {
    if (productToEdit) {
      setPrice(productToEdit?.price);
      setQuantity(productToEdit.quantity);
      setDescription(productToEdit?.description);
      setTitle(productToEdit?.name);
      setCategory(productToEdit?.category);
    }
  }, [productToEdit]);

  return (
    <div>
      <Toaster />
      <Dialog open={open} onOpenChange={setOpen}>
        {/* <DialogTrigger></DialogTrigger> */}
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>
              {productToEdit ? "Update Product" : "Add Your Product"}
            </DialogTitle>
          </DialogHeader>
          <div>
            <Input
              type="text"
              placeholder="Name of Product"
              className="mt-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Quantity of Product"
              className="mt-3"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Price of Product"
              className="mt-3"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <div className="flex gap-3 justify-center items-center">
              <Input
                type="file"
                placeholder="Image of the Product"
                className="mt-3"
                onChange={(e) => setImage(e.target.files[0])}
              />
              {productToEdit?.image && !image && (
                <img
                  src={productToEdit.image}
                  alt="Product"
                  className="w-20 h-20 object-cover rounded-md mt-3"
                />
              )}
              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Selected"
                  className="w-20 h-20 object-cover rounded-md mt-3"
                />
              )}
            </div>
            <Textarea
              placeholder="Description of the Product"
              className="mt-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <Select
              value={category}
              onValueChange={(value) => {
                console.log(category);
                setCategory(value);
              }}
            >
              <SelectTrigger className="mt-3">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mobile">Mobile</SelectItem>
                <SelectItem value="laptop">Laptop</SelectItem>
                <SelectItem value="others">Others</SelectItem>
              </SelectContent>
            </Select>
            <Button
              className="bg-black text-white mt-3 w-full hover:bg-gray-900"
              onClick={addProduct}
            >
              {createProductLoading || updateProductLoading ? (
                <Loader />
              ) : productToEdit ? (
                "Update Product"
              ) : (
                "Add Product"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateProductModal;
