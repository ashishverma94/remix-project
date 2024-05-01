import { json } from "@remix-run/node";
import { getContacts } from "../data";
import { NavLink, useLoaderData, } from "@remix-run/react";
import { BlogCard } from "../components/BlogCard";


export async function loader() {
  const x = await getContacts();
  return json(x);
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <h1>All blogs</h1>
      <NavLink to={"createBlog"}>
        <button type="submit">Create New Blog</button>
      </NavLink>
      <div className="all-blog-container">
      {
        data.map((blog)=>{
          return <BlogCard key={blog.id} blog = {blog} />
        })
      }
      </div>
    </>
  );
}
