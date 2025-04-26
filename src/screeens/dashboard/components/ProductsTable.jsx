import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { DeleteProduct, GetAllProduct } from '@/store/features/product/product.slice'
import { MoreHorizontal } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast, Toaster } from 'sonner'
import Swal from 'sweetalert2'
import CreateProductModal from './CreateProductModal'

const projects = [
  {
    id: 1,
    name: "Summer Collection",
    status: "Active",
    budget: "$12,000",
    progress: 75,
    created: "2023-06-10",
    createdBy: "M.Younis"
  },
  {
    id: 2,
    name: "Winter Essentials",
    status: "Planning",
    budget: "$8,500",
    progress: 25,
    created: "2023-07-15",
    createdBy: "M.Younis"
  },
  {
    id: 3,
    name: "Fall Fashion",
    status: "Active",
    budget: "$10,200",
    progress: 50,
    created: "2023-05-22",
    createdBy: "M.Younis"
  },
  {
    id: 4,
    name: "Spring Accessories",
    status: "Completed",
    budget: "$5,800",
    progress: 100,
    created: "2023-03-08",
    createdBy: "M.Younis"
  },
]

function ProductsTable() {
  const dispatch = useDispatch();
  const { allProducts, allProductLoading } = useSelector(state => state.product)
  const [openModal, setOpenModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState();

  function moveToNext(response) {
    if (response.success) {
      toast.success(response.message)
      dispatch(GetAllProduct())
    } else {
      toast.error(response)
      dispatch(reset())
    }
  }

  function deleteProduct(id) {
    Swal.fire({
      title: "Do you want to delete this product?",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      customClass: {
        confirmButton: "bg-red-600 text-white px-4 py-2 rounded hover:bg-red-800 me-2",
        cancelButton: "bg-[#242323] text-white px-4 py-2 rounded hover:bg-[#1a1a1a]"
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(DeleteProduct({ id, moveToNext }))
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

  function editProduct(product) {
    setProductToEdit(product);
    setOpenModal(true)
  }

  useEffect(() => {
    if (allProducts.length === 0) {
      dispatch(GetAllProduct());
    }
    return () => {
      setProductToEdit(null);
      setOpenModal(false)
    }
  }, [])

  return (
    <>
      <Toaster />
      <div className="px-1 py-2 border shadow-sm mb-3">
        {
          allProductLoading ? "Loading" : <Table>
            <TableHeader className="bg-gray-200">
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allProducts?.map((product) => (
                <TableRow key={product._id}>
                  <TableCell className="font-medium">{product?.name}</TableCell>
                  <TableCell>{product?.price}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        product.quantity !== 0
                          ? "default"
                          : "outline"
                      }
                      className={product.quantity !== 0 ? "bg-black text-white rounded-full hover:bg-gray-800" : "rounded-full"}
                    >
                      {product?.quantity === 0 ? "out of stock" : "in stock"}
                    </Badge>
                  </TableCell>
                  <TableCell>{product.createdAt.split("T")[0]}</TableCell>
                  <TableCell className="text-green-700 font-semibold">{product?.createdBy}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => editProduct(product)}>Edit</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => deleteProduct(product._id)}>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        }
        <CreateProductModal open={openModal} setOpen={setOpenModal} productToEdit={productToEdit} setProductToEdit={setProductToEdit} />
      </div>
    </>
  )
}

export default ProductsTable
