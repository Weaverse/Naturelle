import { json, type LoaderFunctionArgs } from '@shopify/remix-oxygen';
import { useLoaderData, type MetaFunction } from '@remix-run/react';
import { WeaverseContent } from '~/weaverse';


export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [{ title: `Hydrogen | ${data?.page.title ?? ''}` }];
};

export async function loader({ params, context }: LoaderFunctionArgs) {
  if (!params.handle) {
    throw new Error('Missing page handle');
  }

  const { page } = await context.storefront.query(PAGE_QUERY, {
    variables: {
      handle: params.handle,
    },
  });

  if (!page) {
    throw new Response('Not Found', { status: 404 });
  }

  return json({ page, weaverseData: await context.weaverse.loadPage({ type: 'PAGE', handle: params.handle }), });
}

export default function Page() {
  const { page } = useLoaderData<typeof loader>();

  return (
    <>
      <div className="page">
        <header>
          <h1>{page.title}</h1>
        </header>
        <main dangerouslySetInnerHTML={{ __html: page.body }} />
      </div>
      <WeaverseContent />
    </>
  );
}

const PAGE_QUERY = `#graphql
  query Page(
    $language: LanguageCode,
    $country: CountryCode,
    $handle: String!
  )
  @inContext(language: $language, country: $country) {
    page(handle: $handle) {
      id
      title
      body
      seo {
        description
        title
      }
    }
  }
` as const;
