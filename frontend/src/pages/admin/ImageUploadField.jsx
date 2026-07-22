// src/pages/admin/ImageUploadField.jsx
import { useRef, useState } from "react";
import { resolveImageUrl } from "../../lib/resolveImageUrl";

const API_URL = import.meta.env.VITE_API_URL;

export default function ImageUploadField({ value, onChange }) {
  console.log('🚨 [ImageUploadField] RENDU — value reçue:', value); 
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFile = async (file) => {
    if (!file) return;
    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Échec de l'upload");
      }

      const data = await res.json();
      onChange(data.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      // permet de re-uploader le même fichier deux fois de suite si besoin
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const preview = resolveImageUrl(value);
 console.log('🖼️ [ImageUploadField]', { value, preview });
  return (
    <div>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          handleFile(e.dataTransfer.files?.[0]);
        }}
        className="cursor-pointer border-[3px] border-dashed border-black/20 rounded-2xl h-24 px-10 w-full aspect-video flex items-center justify-center overflow-hidden bg-black/5 hover:border-green-600 transition-colors relative"
      >
        {preview ? (
          <img src={preview} alt="Aperçu" className="w-full h-full object-cover" />
        ) : (
          <span className="text-xs text-gray-400 font-poppins px-4 text-center">
            Clique ou dépose une image ici
          </span>
        )}

        {uploading && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white text-xs font-poppins">Envoi en cours...</span>
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />

      {error && <p className="text-xs text-red-500 mt-1.5 font-poppins">{error}</p>}

      {value && !uploading && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="text-[11px] text-gray-400 hover:text-red-500 mt-1.5 font-poppins transition-colors"
        >
          Retirer l'image
        </button>
      )}
    </div>
  );
}