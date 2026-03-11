import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SupplierRecord } from "@/constants/mockSuppliers";

interface SupplierCardProps {
  supplier: SupplierRecord;
}

export default function SupplierCard({ supplier }: SupplierCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">{supplier.supplierName}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm space-y-1 text-muted-foreground">
        <p>Category: {supplier.materialCategory}</p>
        <p>Delivery: {supplier.deliveryTimeDays} days</p>
        <p>Reliability: {supplier.reliabilityScore}/100</p>
        <p>Price Index: {supplier.priceIndex}</p>
      </CardContent>
    </Card>
  );
}
