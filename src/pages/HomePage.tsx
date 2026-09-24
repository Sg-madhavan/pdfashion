import PDFashionExperience from "@/components/PDFashionExperience";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

/** Migrated from Next.js `src/app/page.tsx` (route `/`). */
export default function HomePage() {
  useDocumentMeta();
  return <PDFashionExperience />;
}
