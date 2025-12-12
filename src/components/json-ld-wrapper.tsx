export function JsonLdWrapper(content: any) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(content).replace(/</g, "\\u003c"),
      }}
    />
  );
}
