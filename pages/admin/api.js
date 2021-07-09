import AdminLayout from '@/components/AdminLayout';
import swaggerJSDoc from 'swagger-jsdoc';
import SwaggerUI from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

function ApiDoc({ spec }) {
  return (
    <AdminLayout>
      <div className="flex-1 overflow-y-auto transition duration-200 bg-white dark:invert">
        <SwaggerUI spec={spec} />
      </div>
    </AdminLayout>
  );
}

export function getStaticProps() {
  const spec = swaggerJSDoc({
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'API',
        version: '1.0.0',
      },
      tags: [
        {
          name: 'Preset',
          description: 'Predefined details and settings of a certificate',
        },
        {
          name: 'Design',
          description: 'Design of a certificate',
        },
      ],
      servers: [
        {
          url: 'http://localhost:3000/api',
          description: 'Development',
        },
        {
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/api`,
          description: 'Production',
        },
      ],
    },
    apis: ['./pages/**/*.js'],
  });

  return {
    props: {
      spec,
    },
  };
}

export default ApiDoc;
