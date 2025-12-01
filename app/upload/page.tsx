"use client";

import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [serverResponse, setServerResponse] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const f = e.dataTransfer.files?.[0] || null;
    setFile(f);
  };

  async function upload() {
    if (!file) return;

    setUploading(true);
    setProgress(0);
    setServerResponse(null);

    const fd = new FormData();
    fd.append("file", file);
    fd.append("title", file.name);
    fd.append("vendor", "local");

    // REAL PROGRESS BAR
    const req = new XMLHttpRequest();
    req.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable) {
        setProgress(Math.round((e.loaded / e.total) * 100));
      }
    });

    req.onreadystatechange = () => {
      if (req.readyState === 4) {
        if (req.status === 200) {
          setServerResponse(JSON.parse(req.responseText));
        } else {
          setServerResponse({ error: req.responseText });
        }
        setUploading(false);
      }
    };

    req.open("POST", "/api/upload");
    req.send(fd);
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-10">
      <h1 className="text-4xl font-bold mb-6">Upload Video</h1>

      {/* Drag & Drop Zone */}
      <div
        className="border-2 border-dashed border-slate-600 p-10 rounded-xl text-center mb-4 cursor-pointer"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {file ? (
          <p className="text-xl">{file.name}</p>
        ) : (
          <p className="text-lg text-slate-400">Drag & drop video here</p>
        )}

        <input type="file" onChange={handleFileChange} className="mt-4" />
      </div>

      {/* Upload button */}
      <button
        onClick={upload}
        disabled={!file || uploading}
        className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-500 px-6 py-3 rounded-lg"
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {/* Progress Bar */}
      {uploading && (
        <div className="mt-4 w-full bg-slate-700 rounded-xl">
          <div
            className="bg-green-500 h-4 rounded-xl"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      {/* Server response */}
      {serverResponse && (
        <div className="mt-6 bg-slate-800 p-6 rounded-xl">
          <pre>{JSON.stringify(serverResponse, null, 2)}</pre>

          {serverResponse.video?.thumbnailUrl && (
            <img
              src={serverResponse.video.thumbnailUrl}
              alt="thumb"
              className="w-48 mt-4 rounded-lg"
            />
          )}
        </div>
      )}
    </div>
  );
}
