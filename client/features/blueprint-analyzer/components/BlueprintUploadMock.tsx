interface BlueprintUploadMockProps {
  label?: string;
}

export default function BlueprintUploadMock({ label = "Drop blueprint file here or click to upload (UI mock only)" }: BlueprintUploadMockProps) {
  return (
    <div className="rounded-md border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
      {label}
    </div>
  );
}
