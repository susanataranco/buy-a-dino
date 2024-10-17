import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { TableReservesProps } from "./TableReserves.types";
import { formatCurrency } from "@/utils/formatCurrency";
  
  export function TableReserves(props: TableReservesProps) {
    const { orders } = props;
  
    const totalAmount = orders.reduce((acc, booking) => {
      return acc + parseFloat(booking.totalAmount);
    }, 0);
  
    return (
      <Table>
        <TableCaption>A list of your recent bookings</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Order Date</TableHead>
            <TableHead>Customer ID</TableHead>
            <TableHead>Dino</TableHead>
            <TableHead>Date Start</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">
                {new Date(order.updatedAt).toLocaleDateString()}
                </TableCell>
              <TableCell className="font-medium max-w-[100px] truncate">{order.userId}</TableCell>
              <TableCell className="font-medium">{order.dinoName}</TableCell>
              <TableCell className="font-medium">
                {new Date(order.orderDate).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                {(Number(order.totalAmount))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell className="text-right">
              {formatCurrency(totalAmount.toString())}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );
  }