interface SchemaMarkupProps {
  schemas: Record<string, unknown>[];
}

export default function SchemaMarkup({ schemas }: SchemaMarkupProps) {
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
