import { json, redirect } from "@remix-run/node";
import { createEmptyContact, getContacts } from "../data";
import { Form, useLoaderData, } from "@remix-run/react";
import { BlogCard } from "../components/BlogCard";

export const action = async () => {
  await createEmptyContact()
  return redirect(`/`);
};

export async function loader() {
  const x = await getContacts();
  return json(x);
}

export default function Index() {
  const data = useLoaderData<typeof loader>();
  return (
    <>
      <h1>All blogs</h1>
      <Form method="post">
        <button type="submit">Create New Blog</button>
      </Form>
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
