import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'


function CreateProductModal({ open, setOpen }) {
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen} >
        {/* <DialogTrigger>Open</DialogTrigger> */}
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Add Your Products</DialogTitle>
          </DialogHeader>
          <div>
            <Input type="text" placeholder="Name of Product" className="mt-3" />
            <Input type="text" placeholder="Quantity of Product" className="mt-3" />
            <Input type="text" placeholder="Price of Product" className="mt-3" />
            <Input type="file" placeholder="Image of the Product" className="mt-3" />
            <Textarea placeholder="Description of the Product" className="mt-3" />
            <Button className="bg-black text-white mt-3 w-full hover:bg-gray-900">Add New Product</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default CreateProductModal
