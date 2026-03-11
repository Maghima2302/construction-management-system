import { Link } from "react-router-dom";
import SupplierCard from "@/components/common/SupplierCard";
import { MOCK_SUPPLIERS, SUPPLIER_PRICE_COMPARISON } from "@/constants/mockSuppliers";
import SupplierComparisonPanel from "@/features/suppliers/components/SupplierComparisonPanel";

export default function SuppliersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Supplier Intelligence</h1>
        <p className="text-sm text-muted-foreground">Supplier ratings, material availability, and procurement price visibility.</p>
      </div>

      <SupplierComparisonPanel data={SUPPLIER_PRICE_COMPARISON} />

      <div className="grid gap-4 md:grid-cols-2">
        {MOCK_SUPPLIERS.map((supplier) => (
          <Link key={supplier.id} to={`/suppliers/${supplier.id}`}>
            <SupplierCard supplier={supplier} />
          </Link>
        ))}
      </div>
    </div>
  );
}
