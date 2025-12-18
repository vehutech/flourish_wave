// components/PDFViewer.tsx
"use client";
import Image from "next/image";
import Link from "next/link";

interface LogoConfig {
  src?: string;
  alt?: string;
  text?: string;
  className?: string;
  link?: string;
}

interface PDFViewerProps {
  pdfFile: string;
  defaultFileName?: string;
  logo?: LogoConfig;
  primaryColor?: string;
  secondaryColor?: string;
  height?: string;
  fileToDownload?: string
}

export const PDFViewer = ({
  pdfFile,
  fileToDownload,
  defaultFileName = "document.pdf",
  logo = { text: "PDF Viewer" },
  primaryColor = "#000000",
  secondaryColor = "#f3f4f6",
  height = "100vh",
}: PDFViewerProps) => {
  const handleDownloadClick = async () => {
    try {
        let response;
        if (fileToDownload) {
            response = await fetch(fileToDownload);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = defaultFileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  const renderLogo = () => {
    const content = logo.src ? (
      <Image
        src={logo.src}
        alt={logo.alt || "Logo"}
        width={32}
        height={32}
        className={logo.className || "h-8"}
      />
    ) : (
      <span className={logo.className || "text-xl font-bold"}>
        {logo.text || "PDF Viewer"}
      </span>
    );

    if (logo.link) {
      return <Link href={logo.link}>{content}</Link>;
    }

    return content;
  };

  return (
    <div
      className="flex flex-col"
      style={{ height, backgroundColor: secondaryColor }}
    >
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            {renderLogo()}
          </div>

          <div className="flex items-center gap-3">
            {/* File name badge - hidden on mobile */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
              <svg
                className="w-4 h-4 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="text-sm font-medium text-gray-700 max-w-xs truncate">
                {defaultFileName}
              </span>
            </div>

            {/* Download button */}
            <button
              onClick={handleDownloadClick}
              className="px-4 py-2 text-white rounded-lg hover:opacity-90 transition-all font-medium flex items-center gap-2 shadow-sm hover:shadow-md"
              style={{ backgroundColor: primaryColor }}
              title="Download PDF"
              type="button"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              <span className="hidden sm:inline">Download</span>
            </button>
          </div>
        </div>

        {/* Mobile file name badge */}
        <div className="sm:hidden mt-2 flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg border border-gray-200">
          <svg
            className="w-4 h-4 text-gray-600 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <span className="text-sm font-medium text-gray-700 truncate">
            {defaultFileName}
          </span>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="flex-1 overflow-hidden p-4">
        <div className="h-full max-w-7xl mx-auto">
          <iframe
            src={pdfFile}
            className="w-full h-full rounded-lg shadow-lg border border-gray-300"
            title="PDF Viewer"
            style={{ backgroundColor: "white" }}
          />
        </div>
      </div>
    </div>
  );
};