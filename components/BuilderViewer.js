import ThemeSwitcher from '@/components/ThemeSwitcher';
import useBuilderProperties from '@/hooks/useBuilderProperties';
import Image from 'next/image';
import { useDraggable } from 'use-draggable';

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
        <div className="absolute inset-0 z-10 flex items-center justify-center h-full overflow-hidden">
          <Draggable>
            <ReceiverName />
            <Paragraph />
            <DateAwarded />
          </Draggable>
        </div>
      </div>
    </main>
  );
}

export default BuilderViewer;

function Draggable({ children }) {
  const { targetRef, handleRef } = useDraggable({ controlStyle: true });

  return (
    <div ref={targetRef}>
      <div ref={handleRef} className="text-center">
        {children}
      </div>
    </div>
  );
}

function ReceiverName() {
  const { details, settings } = useBuilderProperties();

  return (
    <h1
      className="inline-block transform translate-y-3"
      style={{
        fontSize: settings.receiverFontSize || 50,
        fontFamily:
          settings.receiverFontFamily === 'Default'
            ? 'system-ui, sans-serif'
            : settings.receiverFontFamily,
        color: settings.receiverFontColor || '#000000',
      }}>
      {details.receiverName ? details.receiverName : 'Name of the receiver'}
    </h1>
  );
}

function Paragraph() {
  const { details, settings } = useBuilderProperties();

  return (
    <p
      className="mx-auto transform translate-y-3 text-base-700 font-noto"
      style={{ maxWidth: settings.paragraphMaxWidth }}>
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

  return (
    <p className="transform text-base-700 translate-y-9 font-noto">
      <span>Awarded on </span>
      <time>
        {details.dateAwarded ? formatDate(details.dateAwarded) : 'xx xxx xxxx'}
      </time>
    </p>
  );
}
