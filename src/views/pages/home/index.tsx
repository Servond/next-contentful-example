import contentfulClient from "@/lib/contentfulClient";
import { TypeBlogPostSkeleton, TypeBlogPostAsset } from "@/types/blog.type";

import Link from "next/link";

const getBlogs = async () => {
  try {
    const blogs = await contentfulClient.getEntries<TypeBlogPostSkeleton>({
      content_type: "blogPost",
    });
    console.log(blogs.items[0].fields.body);

    return blogs;
  } catch (err) {
    console.log(err);
  }
};

export default async function HomeView() {
  const blogs = await getBlogs();
  return (
    <div>
      {blogs &&
        blogs.items?.map((blog, idx) => (
          <Link key={idx} href={`/detail/${blog.fields.slug}`}>
            <div>
              <img
                src={`https:${
                  (blog.fields.image as TypeBlogPostAsset)?.fields.file.url
                }`}
              />
              <p>{blog.fields.title}</p>
            </div>
          </Link>
        ))}
    </div>
  );
}
