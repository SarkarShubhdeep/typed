import { staticDocuments } from "../../../data/documents";
import DocumentView from "../../../components/documents/document-view";
import { notFound } from "next/navigation";

// Generate static params for all documents
export function generateStaticParams() {
    return staticDocuments.map((doc) => ({
        id: doc.id,
    }));
}

export default function DocumentPage({ params }: { params: { id: string } }) {
    const documentId = params.id;

    // Find the document by ID
    const document = staticDocuments.find((doc) => doc.id === documentId);

    if (!document) {
        notFound();
    }

    return <DocumentView document={document} />;
}
