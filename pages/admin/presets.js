import AdminLayout from '@/components/AdminLayout';
import CreatedDate from '@/components/CreatedDate';
import DesignChooser from '@/components/DesignChooser';
import DetailsToolbarView from '@/components/DetailsToolbarView';
import FontFamilySelector from '@/components/FontFamilySelector';
import MasterDetailsLayout from '@/components/MasterDetailsLayout';
import PresetChooser from '@/components/PresetChooser';
import MasterDetailsProvider from '@/context/MasterDetailsContext';
import FormGroup from '@/elements/FormGroup';
import FormInput from '@/elements/FormInput';
import TextArea from '@/elements/TextArea';
import useMasterDetails from '@/hooks/useMasterDetails';
import usePresetsApi from '@/hooks/usePresetsApi';
import nullPresetObject from '@/utils/nullPresetObject';
import { useState } from 'react';
import toast from 'react-hot-toast';

function AdminPresetsPage() {
  return (
    <MasterDetailsProvider defaultValue={nullPresetObject}>
      <PageContents />
    </MasterDetailsProvider>
  );
}

export default AdminPresetsPage;

function PageContents() {
  const { setMasterDetails } = useMasterDetails();

  return (
    <AdminLayout>
      <MasterDetailsLayout
        title="Presets"
        onCreateHandler={() => setMasterDetails(nullPresetObject)}
        masterView={<MasterView />}
        detailsView={<DetailsView />}
        toolbarView={<ToolbarView />}
      />
    </AdminLayout>
  );
}

function MasterView() {
  const { masterDetails, setMasterDetails } = useMasterDetails();

  return (
    <PresetChooser
      value={masterDetails._id}
      onChange={(item) => setTimeout(() => setMasterDetails(item), 0)}
    />
  );
}

function DetailsView() {
  const { masterDetails, setMasterDetails } = useMasterDetails();

  console.log('Details ', masterDetails);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-2xl mx-auto mt-12 mb-8">
        <FormGroup className="text-3xl" label="Preset title">
          <FormInput
            type="text"
            name="title"
            value={masterDetails?.title || ''}
            onChange={(e) =>
              setMasterDetails({
                ...masterDetails,
                [e.target.name]: e.target.value,
              })
            }
            placeholder="Name of the preset"
          />
        </FormGroup>
        <h1 className="pt-2 m-6 text-3xl font-bold">Details</h1>
        <FormGroup label="Receiver name">
          <FormInput
            type="text"
            name="receiverName"
            value={masterDetails?.details?.receiverName || ''}
            onChange={(e) =>
              setMasterDetails({
                ...masterDetails,
                details: {
                  ...masterDetails.details,
                  [e.target.name]: e.target.value,
                },
              })
            }
            placeholder="Name of the receiver"
          />
        </FormGroup>
        <FormGroup label="Paragraph">
          <TextArea
            name="paragraph"
            value={masterDetails?.details?.paragraph || ''}
            onChange={(e) =>
              setMasterDetails({
                ...masterDetails,
                details: {
                  ...masterDetails.details,
                  [e.target.name]: e.target.value,
                },
              })
            }
            placeholder="Reason of rewarding the certificate"
          />
        </FormGroup>
        <FormGroup label="Date awarded on">
          <FormInput
            type="date"
            name="dateAwarded"
            value={masterDetails?.details?.dateAwarded || ''}
            onChange={(e) =>
              setMasterDetails({
                ...masterDetails,
                details: {
                  ...masterDetails.details,
                  [e.target.name]: e.target.value,
                },
              })
            }
          />
        </FormGroup>
        <FormGroup label="Signature 1">
          <FormInput
            type="text"
            name="signature1"
            value={masterDetails?.details?.signature1 || ''}
            onChange={(e) =>
              setMasterDetails({
                ...masterDetails,
                details: {
                  ...masterDetails.details,
                  [e.target.name]: e.target.value,
                },
              })
            }
            placeholder="Person name"
          />
        </FormGroup>
        <FormGroup label="Signature 2">
          <FormInput
            type="text"
            name="signature2"
            value={masterDetails?.details?.signature2 || ''}
            onChange={(e) =>
              setMasterDetails({
                ...masterDetails,
                details: {
                  ...masterDetails.details,
                  [e.target.name]: e.target.value,
                },
              })
            }
            placeholder="Person name"
          />
        </FormGroup>
        <hr className="mx-6 mt-10 border-base-300 dark:border-base-700" />
        <h1 className="mx-6 mt-8 mb-6 text-3xl font-bold">Settings</h1>
        <FormGroup label="Design">
          <DesignChooser
            value={masterDetails?.settings?.designId || ''}
            onChange={(item) => {
              setMasterDetails({
                ...masterDetails,
                settings: {
                  ...masterDetails.settings,
                  designId: item._id,
                },
              });
            }}
          />
        </FormGroup>
        <FormGroup label="Receiver font size">
          <FormInput
            type="number"
            name="receiverFontSize"
            value={masterDetails?.settings?.receiverFontSize || 0}
            onChange={(e) =>
              setMasterDetails({
                ...masterDetails,
                settings: {
                  ...masterDetails.settings,
                  [e.target.name]: Number(e.target.value),
                },
              })
            }
            placeholder="50"
          />
        </FormGroup>
        <FormGroup label="Receiver font family">
          <FontFamilySelector
            value={masterDetails?.settings?.receiverFontFamily || 'Default'}
            onChange={(value) => {
              setMasterDetails({
                ...masterDetails,
                settings: {
                  ...masterDetails.settings,
                  receiverFontFamily: value,
                },
              });
            }}
          />
        </FormGroup>
        <FormGroup label="Receiver font color">
          <FormInput
            type="color"
            name="receiverFontColor"
            value={masterDetails?.settings?.receiverFontColor || '#000000'}
            onChange={(e) =>
              setMasterDetails({
                ...masterDetails,
                settings: {
                  ...masterDetails.settings,
                  [e.target.name]: e.target.value,
                },
              })
            }
            className="w-full h-10"
          />
        </FormGroup>
        <FormGroup label="Paragraph maximum width">
          <FormInput
            type="text"
            name="paragraphMaxWidth"
            value={masterDetails?.settings?.paragraphMaxWidth || ''}
            onChange={(e) =>
              setMasterDetails({
                ...masterDetails,
                settings: {
                  ...masterDetails.settings,
                  [e.target.name]: e.target.value,
                },
              })
            }
            placeholder="512px"
          />
        </FormGroup>
        <CreatedDate value={masterDetails?.createdAt} />
      </div>
    </div>
  );
}

function ToolbarView() {
  const { masterDetails, setMasterDetails } = useMasterDetails();
  const { mutate } = usePresetsApi();
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const body = {
    title: masterDetails?.title,
    details: {
      receiverName: masterDetails?.details?.receiverName,
      paragraph: masterDetails?.details?.paragraph,
      dateAwarded: masterDetails?.details?.dateAwarded,
      signature1: masterDetails?.details?.signature1,
      signature2: masterDetails?.details?.signature2,
    },
    settings: {
      designId: masterDetails?.settings?.designId,
      receiverFontSize: masterDetails?.settings?.receiverFontSize,
      receiverFontFamily: masterDetails?.settings?.receiverFontFamily,
      receiverFontColor: masterDetails?.settings?.receiverFontColor,
      paragraphMaxWidth: masterDetails?.settings?.paragraphMaxWidth,
    },
  };

  const handleCreate = async () => {
    setIsSaving(true);
    try {
      await (
        await fetch('/api/presets', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
      ).json();
      setMasterDetails(nullPresetObject);
      mutate();
      toast.success('New preset created');
    } catch (ex) {
      toast.error('Failed to create preset');
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdate = async () => {
    setIsSaving(true);
    try {
      await (
        await fetch(`/api/presets/${masterDetails._id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
      ).json();
      setMasterDetails(nullPresetObject);
      mutate();
      toast.success('Preset updated');
    } catch (ex) {
      toast.error('Failed to update preset');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSave = () => {
    if (masterDetails._id) {
      handleUpdate();
    } else {
      handleCreate();
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await (
        await fetch(`/api/presets/${masterDetails._id}`, {
          method: 'DELETE',
        })
      ).json();
      setMasterDetails(nullPresetObject);
      mutate();
      toast.success('Preset deleted');
    } catch (ex) {
      toast.error('Failed to delete preset');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <DetailsToolbarView
      onSaveHandler={handleSave}
      onDeleteHandler={handleDelete}
      isSaving={isSaving}
      isDeleting={isDeleting}
      isSaveDisabled={!masterDetails.title || isSaving}
      isDeleteDisabled={!masterDetails.title || isDeleting}
      isDeleteShown={masterDetails?._id}
    />
  );
}
