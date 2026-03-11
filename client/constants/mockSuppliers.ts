export interface SupplierRecord {
  id: string;
  supplierName: string;
  materialCategory: string;
  deliveryTimeDays: number;
  reliabilityScore: number;
  priceIndex: number;
}

export const MOCK_SUPPLIERS: SupplierRecord[] = [
  { id: "SUP-401", supplierName: "BuildCore Materials", materialCategory: "Cement & Concrete", deliveryTimeDays: 3, reliabilityScore: 91, priceIndex: 97 },
  { id: "SUP-402", supplierName: "SteelSpan Industries", materialCategory: "Structural Steel", deliveryTimeDays: 5, reliabilityScore: 88, priceIndex: 103 },
  { id: "SUP-403", supplierName: "EcoBrick Solutions", materialCategory: "Masonry", deliveryTimeDays: 4, reliabilityScore: 86, priceIndex: 94 },
  { id: "SUP-404", supplierName: "GreenBind Tech", materialCategory: "Eco Binders", deliveryTimeDays: 6, reliabilityScore: 84, priceIndex: 99 },
];

export const SUPPLIER_PRICE_COMPARISON = [
  { name: "BuildCore", price: 97 },
  { name: "SteelSpan", price: 103 },
  { name: "EcoBrick", price: 94 },
  { name: "GreenBind", price: 99 },
];
