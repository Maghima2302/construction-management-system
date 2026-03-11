import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MOCK_SUPPLIERS } from "@/constants/mockSuppliers";

export default function SupplierDetailsPage() {
  const { id } = useParams();
  const supplier = MOCK_SUPPLIERS.find((item) => item.id === id) || MOCK_SUPPLIERS[0];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{supplier.supplierName}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm text-muted-foreground">
        <p>Material Category: {supplier.materialCategory}</p>
        <p>Delivery Time: {supplier.deliveryTimeDays} days</p>
        <p>Reliability Score: {supplier.reliabilityScore}/100</p>
        <p>Price Index: {supplier.priceIndex}</p>
        <p>Availability Confidence: {supplier.reliabilityScore > 88 ? "High" : "Moderate"}</p>
      </CardContent>
    </Card>
  );
}
