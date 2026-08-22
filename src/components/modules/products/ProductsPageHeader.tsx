interface ProductsPageHeaderProps {
  title: string;
  description?: string;
}
export default function ProductsPageHeader({
  title,
  description,
}: ProductsPageHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold uppercase">{title}</h1>
        {description && (
          <p className="text-muted-foreground mt-1">{description}</p>
        )}
      </div>
    </div>
  );
}
