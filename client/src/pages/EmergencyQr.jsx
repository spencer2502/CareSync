import React, { useState } from "react";
import { QrCode, Download, Copy } from "lucide-react";

const dummyQrCode = "data:image/png;base64,iVBORw0..."; // Replace with your actual base64 QR code

const EmergencyQR = () => {
  const [qrGenerated, setQrGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setQrGenerated(true);
      alert("QR code generated!");
    }, 1500);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = dummyQrCode;
    link.download = "emergency-qr.png";
    link.click();
    alert("QR code downloaded!");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(dummyQrCode);
    alert("QR code copied to clipboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-indigo-700 mb-2">Emergency QR Code</h1>
        <p className="text-gray-600 mb-8">
          Generate a secure QR for instant access to your medical information during emergencies.
        </p>

        {/* QR Display Card */}
        <div className="bg-white shadow-md rounded-2xl p-8 mb-6 hover:shadow-indigo-300 transition-all duration-500 ease-in-out">

          {qrGenerated ? (
            <img
              src={dummyQrCode}
              alt="Emergency QR"
              className="mx-auto w-48 h-48 rounded-lg border border-indigo-200"
            />
          ) : (
            <div className="flex items-center justify-center w-48 h-48 mx-auto bg-indigo-50 border border-dashed rounded-lg text-indigo-400">
              <QrCode className="w-12 h-12" />
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mb-10">
          {!qrGenerated ? (
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="bg-indigo-700 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-800 transition disabled:opacity-50"
            >
              {isGenerating ? "Generating..." : "Generate QR Code"}
            </button>
          ) : (
            <>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 bg-indigo-700 text-white px-5 py-2 rounded-lg shadow hover:bg-indigo-800 transition"
              >
                <Download className="w-5 h-5" /> Download
              </button>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 bg-indigo-100 text-indigo-700 px-5 py-2 rounded-lg shadow hover:bg-indigo-200 transition"
              >
                <Copy className="w-5 h-5" /> Copy
              </button>
            </>
          )}
        </div>

        {/* Feature Info Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "⚡ Instant Access",
              desc: "Medical staff can instantly scan and retrieve key health data."
            },
            {
              title: "🔒 Privacy First",
              desc: "Share only the data you choose. Your privacy matters."
            },
            {
              title: "📱 Easy to Share",
              desc: "Download, print, or share with caregivers anytime."
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md p-4 border border-indigo-100 hover:shadow-indigo-300 transition-transform duration-300 hover:scale-105"
            >
              <h3 className="text-lg font-semibold text-indigo-700 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmergencyQR;
