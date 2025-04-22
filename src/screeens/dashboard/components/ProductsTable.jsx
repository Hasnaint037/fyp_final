import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { MoreHorizontal } from 'lucide-react'
import React, { useState } from 'react'
import DeleteDialog from './DeleteDialog'

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
  const [confirm, setConfirm] = useState(false);

  function deleteProduct() {
    setConfirm(true);
  }

  return (
    <>
      <div className="rounded-lg border shadow-sm mb-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.name}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      project.status === "Active"
                        ? "default"
                        : project.status === "Planning"
                          ? "secondary"
                          : "outline"
                    }
                    className={project.status === "Active" ? "bg-black text-white rounded-full hover:bg-gray-800" : project.status === "Planning" ? "bg-gray bg-[#F4F4F5] rounded-full" : "rounded-full"}
                  >
                    {project.status}
                  </Badge>
                </TableCell>
                <TableCell>{project.budget}</TableCell>
                <TableCell>{project.created}</TableCell>
                <TableCell className="text-green-700 font-semibold">{project.createdBy}</TableCell>
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
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => deleteProduct()}>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <DeleteDialog open={confirm} setOpen={setConfirm} />
    </>
  )
}

export default ProductsTable
