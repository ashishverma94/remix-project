import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { getContact, updateContact } from "../data";

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  console.log(params)
  await updateContact(params.blogId, updates);
  return redirect(`/`);
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const blog = await getContact(params.blogId);
  return json({ blog });
};


export default function EditContact() {
  const { blog } = useLoaderData<typeof loader>();
  console.log(blog)
  // const navigate = useNavigate();

  return (
    <div>
    <Form key="idx" id="contact-form" method="post">
    <p>
    <span>Blog Id</span>
    <input
    defaultValue={blog.id}
      aria-label="id"
      name="id"
      type="text"
      placeholder="enter id"
    />
  </p>
  <p>
    <span>Blog Name</span>
    <input
    defaultValue={blog?.heading}
      aria-label="heading"
      name="heading"
      type="text"
      placeholder="enter blog name"
    />
  </p>
  <label>
    <span>Written By</span>
    <input
    defaultValue={blog?.writer}
      name="writer"
      placeholder="enter your name"
      type="text"
    />
  </label>
  <label>
    <span>Twitter</span>
    <input
    defaultValue={blog?.twitter}
      name="twitter"
      placeholder="@jack"
      type="text"
    />
  </label>
  
  <label>
    <span>Content</span>
    <textarea defaultValue={blog?.content}   name="content" rows={6} />
  </label>
  <p>
    <button type="submit">Save</button>
  </p>
</Form>
</div>
  );
}
