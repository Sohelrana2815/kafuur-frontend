export type BudgetOption = {
  minPrice?: number;
  maxPrice?: number;
  label: string;
};
export const BUDGET_OPTIONS: BudgetOption[] = [
  { minPrice: 300, maxPrice: 500, label: "৳300 - ৳500" },
  { minPrice: 500, maxPrice: 1000, label: "৳500 - ৳1,000" },
  { minPrice: 1000, maxPrice: undefined, label: "৳1,000+" },
];
