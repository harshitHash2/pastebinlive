"use client"
import { useState, useEffect } from 'react';
import { useParams, useRouter } from "next/navigation";

import { FileText, Clock, Eye, Copy, CheckCircle, Home, AlertCircle } from 'lucide-react';

export default function ViewCard(paste) {
    const [url, setUrl] = useState("");


useEffect(() => {
setUrl(window.location.href);
}, []);
//     console.log(paste);
//   const params = useParams();
// const id = params.id;
const router = useRouter();
//   const [paste, setPaste] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

//   useEffect(() => {
//     if (!id) return;

//     const fetchPaste = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/pastes/${params.id}`,{cache:"no-store"});

       

//         if (!res.ok) {
//           setError('Paste not found or has expired');
//           setLoading(false);
//           return;
//         }
//         const data = await res.json();
//         setPaste(data);

        

//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//         setError('Failed to load paste');
//         setLoading(false);
//       }
//     };

//     fetchPaste();
//   }, [id]);

  const handleCopy = async () => {
    if (!paste) return;

    try {
      await navigator.clipboard.writeText(paste.paste.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const copyShareUrl = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  const formatTimeRemaining = (expiresAt) => {
    const now = new Date().getTime();
    const expires = new Date(expiresAt).getTime();
    const diff = expires - now;

    if (diff <= 0) return 'Expired';

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    if (hours > 0) return `${hours}h ${minutes}m remaining`;
    if (minutes > 0) return `${minutes}m ${seconds}s remaining`;
    return `${seconds}s remaining`;
  };

  if (loading) {
    return (
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading paste...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !paste) {
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
                  {error || 'This paste may have expired or reached its maximum views.'}
                </p>
                <button
                  onClick={() => router.push("/")}
                  className="btn btn-primary"
                >
                  <Home size={18} className="me-2" />
                  Create New Paste
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0">
            <div className="card-body p-5">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="d-flex align-items-center">
                  <div className="d-inline-flex align-items-center justify-content-center bg-success bg-opacity-10 rounded-circle p-2 me-3">
                    <FileText size={24} className="text-success" />
                  </div>
                  <h1 className="h3 fw-bold text-dark mb-0">Paste Content</h1>
                </div>
                <button
                  onClick={() => router.push("/")}
                  className="btn btn-outline-secondary btn-sm"
                >
                  <Home size={16} className="me-1" />
                  New Paste
                </button>
              </div>

              <div className="row g-3 mb-4">
                <div className="col-md-4">
                  <div className="card bg-light border-0 h-100">
                    <div className="card-body p-3">
                      <div className="d-flex align-items-center">
                        <Eye size={18} className="text-primary me-2" />
                        <div>
                          <div className="small text-muted">Views</div>
                          <div className="fw-semibold">
                            {paste.paste.views}
                            {paste.paste.max_views && ` / ${paste.paste.max_views}`}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {paste.paste.expires_at && (
                  <div className="col-md-8">
                    <div className="card bg-light border-0 h-100">
                      <div className="card-body p-3">
                        <div className="d-flex align-items-center">
                          <Clock size={18} className="text-warning me-2" />
                          <div>
                            <div className="small text-muted">Expires</div>
                            <div className="fw-semibold">
                              {formatTimeRemaining(paste.paste.expires_at)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Share this URL:</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    value={url}
                    readOnly
                  />
                  <button
                    className="btn btn-outline-primary"
                    onClick={copyShareUrl}
                  >
                    {copied ? (
                      <>
                        <CheckCircle size={18} className="me-1" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={18} className="me-1" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label className="form-label fw-semibold mb-0">Content:</label>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={handleCopy}
                  >
                    {copied ? (
                      <>
                        <CheckCircle size={16} className="me-1" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={16} className="me-1" />
                        Copy Text
                      </>
                    )}
                  </button>
                </div>
                <div className="card bg-light border-0">
                  <div className="card-body">
                    <pre className="mb-0" style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                      {paste.paste.content}
                    </pre>
                  </div>
                </div>
              </div>

              <div className="text-muted small text-center mt-4">
                Created {new Date(paste.paste.created_at).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
