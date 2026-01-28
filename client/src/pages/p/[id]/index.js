import ViewCard from "@/components/ViewCard";
import {
  FileText,
  Clock,
  Eye,
  Copy,
  CheckCircle,
  Home,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";


export async function getServerSideProps({ params }) {
  try {
    const res = await fetch(`http://localhost:5000/api/pastes/${params.id}`);

    if (!res.ok) {
      return { props: { paste: null } };
    }

    const data = await res.json();

    return {
      props: {
        paste: data.content,
      },
    };
  } catch (err) {
    return { props: { paste: null } };
  }
}

/* PAGE */
export default function Page({ paste }) {
  if (!paste) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-lg border-0">
              <div className="card-body p-5 text-center">
                <div className="d-inline-flex align-items-center justify-content-center bg-danger bg-opacity-10 rounded-circle p-3 mb-3">
                  <AlertCircle size={40} className="text-danger" />
                </div>

                <h2 className="h3 fw-bold text-dark mb-3">Paste Not Found</h2>

                <p className="text-muted mb-4">
                  This paste may have expired or reached its maximum views.
                </p>

                <Link href="/" className="btn btn-primary">
                  <Home size={18} className="me-2" />
                  Create New Paste
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <ViewCard paste={paste} />;
}
