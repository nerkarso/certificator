import BuilderSidebar from '@/components/BuilderSidebar';
import BuilderViewer from '@/components/BuilderViewer';
import BuilderPropertiesProvider from '@/context/BuilderPropertiesContext';

function BuilderPage() {
  return (
    <BuilderPropertiesProvider>
      <div className="h-full overflow-hidden lg:flex">
        <BuilderSidebar />
        <BuilderViewer />
      </div>
    </BuilderPropertiesProvider>
  );
}

export default BuilderPage;
