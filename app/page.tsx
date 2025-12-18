// app/page.tsx
import { PDFViewer } from './_component/PDFViewer';

const Page = () => {
  return (
    <div>
      <PDFViewer
        pdfFile="/menu.pdf"
        defaultFileName="menu.pdf"
        logo={{
          text: "📄 Order",
          className: "text-2xl font-bold text-amber-600 cursor-pointer",
          link: "/order" // Now properly links!
        }}
        primaryColor="#d97706"
        secondaryColor="#fffbeb"
        height="calc(100vh - 48px)"
        fileToDownload="flourish_menu.pdf"
      />
    </div>
  );
};

export default Page;