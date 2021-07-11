import DesignChooser from '@/components/DesignChooser';
import FontFamilySelector from '@/components/FontFamilySelector';
import PresetChooser from '@/components/PresetChooser';
import Button from '@/elements/Button';
import FormGroup from '@/elements/FormGroup';
import FormInput from '@/elements/FormInput';
import TextArea from '@/elements/TextArea';
import useBuilderProperties from '@/hooks/useBuilderProperties';
import Image from 'next/image';
import { useState } from 'react';
import toast from 'react-hot-toast';

function BuilderSidebar() {
  const [isExporting, setIsExporting] = useState(false);
  const {
    presetId,
    details,
    settings,
    setPresetId,
    setDetails,
    setSettings,
    setDesignContents,
    setReceiverName,
    setReceiverFontSize,
    setReceiverFontColor,
    setReceiverFontFamily,
    setParagraph,
    setDateAwarded,
  } = useBuilderProperties();

  const handleExport = async () => {
    setIsExporting(true);
    const target = document.querySelector('#capture');
    if (typeof window !== 'undefined') {
      try {
        const html2canvas = await import('html2canvas');
        const canvas = await html2canvas.default(target, { scale: 1.34 });
        const imageData = canvas.toDataURL('img/png');
        const jspdf = await import('jspdf');
        const doc = new jspdf.jsPDF({ orientation: 'landscape' });
        doc.addImage(imageData, 'PNG', 0, 0);
        doc.save(`${details?.receiverName || 'Certificate'}.pdf`);
        toast.success('Your certificate is downloading');
      } catch (ex) {
        toast.error('Failed to export your certificate');
      } finally {
        setIsExporting(false);
      }
    } else {
      setIsExporting(false);
    }
  };

  return (
    <aside className="z-10 flex flex-col h-full transition duration-200 bg-white shadow lg:w-80 xl:w-96 dark:bg-base-800">
      <div className="flex-1 overflow-y-auto">
        <div className="flex items-center m-6 sm:justify-center">
          <Image src="/icon-192.png" width="48" height="48" alt="Logo" />
          <h2 className="ml-3 text-3xl font-bold dark:text-white">
            {process.env.NEXT_PUBLIC_SITE_TITLE}
          </h2>
        </div>
        <FormGroup label="Presets">
          <PresetChooser
            value={presetId || ''}
            onChange={(item) => {
              setPresetId(item._id);
              setDetails(item.details);
              setSettings(item.settings);
            }}
          />
        </FormGroup>
        <FormGroup label="Designs">
          <DesignChooser
            value={settings?.designId || ''}
            onChange={(item) => {
              setDesignContents(item.contents);
            }}
            className="lg:grid-cols-2"
            disabled
          />
        </FormGroup>
        <FormGroup label="Receiver name">
          <FormInput
            type="text"
            id="inputReceiverName"
            value={details?.receiverName || ''}
            onChange={(e) => setReceiverName(e.target.value)}
            placeholder="Name of the receiver"
          />
        </FormGroup>
        <FormGroup label="Receiver font size">
          <FormInput
            type="number"
            value={settings?.receiverFontSize || 0}
            onChange={(e) => setReceiverFontSize(Number(e.target.value))}
          />
        </FormGroup>
        <FormGroup label="Receiver font color">
          <FormInput
            type="color"
            value={settings?.receiverFontColor || ''}
            onChange={(e) => setReceiverFontColor(e.target.value)}
            className="w-full h-10"
          />
        </FormGroup>
        <FormGroup label="Receiver font family">
          <FontFamilySelector
            value={settings?.receiverFontFamily || ''}
            onChange={(value) => setReceiverFontFamily(value)}
          />
        </FormGroup>
        <FormGroup label="Paragraph">
          <TextArea
            id="inputParagraph"
            value={details?.paragraph || ''}
            onChange={(e) => setParagraph(e.target.value)}
            placeholder="Reason of awarding the certificate"
          />
        </FormGroup>
        <FormGroup label="Date awarded on">
          <FormInput
            type="date"
            id="inputDateAwarded"
            value={details?.dateAwarded || ''}
            onChange={(e) => setDateAwarded(e.target.value)}
          />
        </FormGroup>
      </div>
      <div className="px-6 py-4 transition duration-200 border-t dark:border-base-700">
        <Button onClick={handleExport} block disabled={isExporting}>
          {isExporting ? 'Exporting...' : 'Export as PDF'}
        </Button>
      </div>
    </aside>
  );
}

export default BuilderSidebar;
