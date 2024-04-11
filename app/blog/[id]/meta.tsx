import { API_URL } from '@/constants';
import { Metadata, ResolvingMetadata } from 'next'
 
type Props = {
  params: { id: string }
}
 
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata | {} = {}
): Promise<Metadata> {
  // read route params
  const id = params.id
 
  // fetch data
  const response = await fetch(`${API_URL.url}/api/blog/${id}`);
  const blog = await response.json();
 
  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || []
 
  return {
    title: blog.title,
    openGraph: {
      images: [`${blog.thumbnail}`],
    },
  }
}
 
export default function Page({ params }: Props) {}