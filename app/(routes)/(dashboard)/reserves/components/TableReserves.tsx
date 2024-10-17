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
            <TableHead>Dino</TableHead>
            <TableHead>Date Start</TableHead>
            <TableHead>Date End</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.dinoName}</TableCell>
              <TableCell>
                {new Date(order.orderDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {new Date(order.orderDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <div className="p-2 text-white bg-green-600 rounded-lg w-fit">
                  {order.status}
                </div>
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