


"use client";

import { useState } from "react";
import { FileText, Clock, Eye, Link2 } from 'lucide-react';
import Head from "next/head";
import Image from "next/image";

import styles from "@/styles/Home.module.css";
export default function Home() {
  const [content, setContent] = useState("");
  const [ttl, setTtl] = useState("");
  const [views, setViews] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");

    const [loading, setLoading] = useState(false);
  
 

  async function create() {
    
    setError("");
    setLink("");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pastes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content,
        ttl_seconds: ttl ? Number(ttl) : undefined,
        max_views: views ? Number(views) : undefined
      })
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error);
      return;
    }

    setLink(data.url);
    setContent("");
    setTtl("");
    setViews("");
  }

  return (
    <>
   
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg border-0">
            <div className="card-body py-2 px-4">
              <div className="text-center mb-4">
                <div className="d-inline-flex align-items-center justify-content-center bg-primary bg-opacity-10 rounded-circle p-3 mb-3">
                  <FileText size={40} className="text-secondary" />
                </div>
                <h1 className="h2 fw-bold text-dark mb-2">PasteBin Lite</h1>
                <p className="text-muted">Share text snippets quickly and securely</p>
              </div>

              {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  {error}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setError('')}
                    aria-label="Close"
                  ></button>
                </div>
              )}

              
                <div className="mb-2">
                  <label htmlFor="content" className="form-label fw-semibold">
                    Your Text
                  </label>
                  <textarea
                    id="content"
                    className="form-control form-control-lg"
                    rows={4}
                    placeholder="Paste your text here..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                  />
                </div>

                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label htmlFor="ttl" className="form-label fw-semibold">
                      <Clock size={18} className="me-2" />
                      Time to Live (seconds)
                    </label>
                    <input
                      id="ttl"
                      type="number"
                      className="form-control"
                      placeholder="Optional - e.g., 3600 (1 hour)"
                      value={ttl}
        onChange={(e) => setTtl(e.target.value)}
                      min="1"
                    />
                    <div className="form-text">Leave empty for no expiration</div>
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="maxViews" className="form-label fw-semibold">
                      <Eye size={18} className="me-2" />
                      Maximum Views
                    </label>
                    <input
                      id="maxViews"
                      type="number"
                      className="form-control"
                      placeholder="Optional - e.g., 10"
                      value={views}
                      onChange={(e) => setViews(e.target.value)}
                      min="1"
                    />
                    <div className="form-text">Leave empty for unlimited views</div>
                  </div>
                </div>

                <div className="d-grid">
                  <button
                    type="button"
                    className="btn btn-secondary btn-lg py-1"
                    disabled={loading}
                    onClick={create}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Creating...
                      </>
                    ) : (
                      <>
                        <Link2 size={20} className="me-2" />
                        Create Shareable Link
                      </>
                    )}
                  </button>
                </div>
              
            </div>
          </div>

          <div className="text-center mt-4 text-muted small">
            <p>Your paste will be accessible via a unique URL after creation</p>
          </div>
          {link && (
        <p>
          Your Link:{" "}
          <a className="btn btn-primary" href={link} target="_blank">
            {link}
          </a>
        </p>
      )}
        </div>
      </div>
    </div>
    </>
  );
}

