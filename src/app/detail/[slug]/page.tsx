import contentfulClient from "@/lib/contentfulClient";
import { TypeBlogPostSkeleton, TypeBlogPostAsset } from "@/types/blog.type";
import RichText from "@/views/components/richText";
const getBlogs = async (slug: string) => {
  try {
    const blogs = await contentfulClient.getEntries<TypeBlogPostSkeleton>({
      content_type: "blogPost",
      "fields.slug[match]": slug,
    });

    return blogs.items[0];
  } catch (err) {
    console.log(err);
  }
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const blog = await getBlogs(slug);
  return (
    <div>
      <img
        src={`https:${
          (blog?.fields.image as TypeBlogPostAsset)?.fields.file.url
        }`}
      />
      <p>{blog?.fields.title}</p>
      <div className="[&>p]:mb-8">
        <RichText document={blog?.fields.body} />
      </div>
    </div>
  );
}
