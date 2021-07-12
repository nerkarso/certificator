import AdminLayout from '@/components/AdminLayout';
import CreatedDate from '@/components/CreatedDate';
import DesignChooser from '@/components/DesignChooser';
import DetailsToolbarView from '@/components/DetailsToolbarView';
import MasterDetailsLayout from '@/components/MasterDetailsLayout';
import MasterDetailsProvider from '@/context/MasterDetailsContext';
import FormGroup from '@/elements/FormGroup';
import FormInput from '@/elements/FormInput';
import TextArea from '@/elements/TextArea';
import useDesignsApi from '@/hooks/useDesignsApi';
import useMasterDetails from '@/hooks/useMasterDetails';
import nullDesignObject from '@/utils/nullDesignObject';
import { useState } from 'react';
import toast from 'react-hot-toast';

function AdminDesignsPage() {
  return (
    <MasterDetailsProvider defaultValue={nullDesignObject}>
      <PageContents />
    </MasterDetailsProvider>
  );
}

export default AdminDesignsPage;

function PageContents() {
  const { setMasterDetails } = useMasterDetails();

  return (
    <AdminLayout>
      <MasterDetailsLayout
        title="Designs"
        onCreateHandler={() => setMasterDetails(nullDesignObject)}
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
    <DesignChooser
      value={masterDetails._id}
      onChange={(item) => setTimeout(() => setMasterDetails(item), 0)}
      className="grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-2"
    />
  );
}

function DetailsView() {
  const { masterDetails, setMasterDetails } = useMasterDetails();

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-2xl mx-auto mt-12">
        <FormGroup label="Title">
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
            placeholder="Name of the design"
          />
        </FormGroup>
        <FormGroup label="Contents">
          <TextArea
            name="contents"
            value={masterDetails?.contents || ''}
            onChange={(e) =>
              setMasterDetails({
                ...masterDetails,
                [e.target.name]: e.target.value,
              })
            }
            rows={15}
            placeholder="Contents of SVG image"
          />
        </FormGroup>
        <CreatedDate value={masterDetails?.createdAt || ''} />
      </div>
    </div>
  );
}

function ToolbarView() {
  const { masterDetails, setMasterDetails } = useMasterDetails();
  const { mutate } = useDesignsApi();

  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  function transformContents(contents) {
    return contents
      .replace(/\s+/g, ' ')
      .replaceAll('"', "'")
      .replaceAll('#', '%23')
      .trim();
  }

  const handleCreate = async () => {
    setIsSaving(true);
    try {
      await (
        await fetch('/api/designs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: masterDetails.title,
            contents: transformContents(masterDetails.contents),
          }),
        })
      ).json();
      setMasterDetails(nullDesignObject);
      mutate();
      toast.success('New design created');
    } catch (ex) {
      toast.error('Failed to create design');
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdate = async () => {
    setIsSaving(true);
    try {
      await (
        await fetch(`/api/designs/${masterDetails._id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: masterDetails.title,
            contents: transformContents(masterDetails.contents),
            createdAt: masterDetails.createdAt || Date.now(),
          }),
        })
      ).json();
      setMasterDetails(nullDesignObject);
      mutate();
      toast.success('Design updated');
    } catch (ex) {
      toast.error('Failed to update design');
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
        await fetch(`/api/designs/${masterDetails._id}`, {
          method: 'DELETE',
        })
      ).json();
      setMasterDetails(nullDesignObject);
      mutate();
      toast.success('Design deleted');
    } catch (ex) {
      toast.error('Failed to delete design');
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
      isSaveDisabled={
        (!masterDetails.title && !masterDetails.contents) || isSaving
      }
      isDeleteDisabled={
        (!masterDetails.title && !masterDetails.contents) || isDeleting
      }
      isDeleteShown={masterDetails?._id}
    />
  );
}
