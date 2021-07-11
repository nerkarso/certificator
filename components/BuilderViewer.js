import ThemeSwitcher from '@/components/ThemeSwitcher';
import useBuilderProperties from '@/hooks/useBuilderProperties';
import Image from 'next/image';

function BuilderViewer() {
  const { designContents } = useBuilderProperties();

  return (
    <main className="flex-1 h-full p-6 overflow-auto transition duration-200 bg-base-100 dark:bg-base-900">
      <ThemeSwitcher />
      <div
        id="capture"
        className="bg-white relative shadow-md w-[842px] h-[595px]">
        <Image
          src={
            designContents
              ? `data:image/svg+xml;utf8,${designContents}`
              : '/design-blank.svg'
          }
          width="842"
          height="595"
          alt="Design"
        />
        <div className="absolute inset-0 z-20 flex items-center justify-center h-full">
          <div className="text-center">
            <ReceiverName />
            <Paragraph />
            <DateAwarded />
          </div>
        </div>
      </div>
    </main>
  );
}

export default BuilderViewer;

function ReceiverName() {
  const { details, settings } = useBuilderProperties();

  return (
    <h1
      className="inline-block transform translate-y-3 select-none hover:opacity-75 hover:cursor-pointer"
      onClick={() => document.querySelector('#inputReceiverName').focus()}
      style={{
        fontSize: settings.receiverFontSize,
        fontFamily:
          settings.receiverFontFamily === 'Default'
            ? 'system-ui, sans-serif'
            : settings.receiverFontFamily,
        color: settings.receiverFontColor,
      }}>
      {details.receiverName ? details.receiverName : 'Name of the receiver'}
    </h1>
  );
}

function Paragraph() {
  const { details, settings } = useBuilderProperties();

  return (
    <p
      className="mx-auto transform translate-y-3 select-none text-base-700 font-noto hover:opacity-75 hover:cursor-pointer"
      style={{ maxWidth: settings.paragraphMaxWidth }}
      onClick={() => document.querySelector('#inputParagraph').focus()}>
      {details.paragraph
        ? details.paragraph
        : 'Reason of awarding the certificate'}
    </p>
  );
}

function DateAwarded() {
  const { details } = useBuilderProperties();

  const formatDate = (value) => {
    if (!value) return '';
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const date = new Date(value);
    const day = date.getUTCDate();
    const monthIndex = date.getUTCMonth();
    const year = date.getUTCFullYear();
    return `${day} ${months[monthIndex]} ${year}`;
  };

  if (details.dateAwarded) {
    return (
      <p
        className="transform text-base-700 translate-y-9 font-noto hover:opacity-75 hover:cursor-pointer"
        onClick={() => document.querySelector('#inputDateAwarded').focus()}>
        Awarded on {formatDate(details.dateAwarded)}
      </p>
    );
  }

  return null;
}
