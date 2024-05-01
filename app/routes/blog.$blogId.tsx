import type { LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";

import invariant from "tiny-invariant";
import { getContact } from "../data";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.blogId, "Missing contactId param");
  const blog = await getContact(params.blogId);
  if (!blog) {
    throw new Response("Not Found", { status: 404 });
  }
  return json({ blog });
};

export default function Contact() {
  const { blog } = useLoaderData<typeof loader>();

  return (
    <div id="contact">
      <div>
        <h1>{blog.heading}</h1>

        <h2>{blog.content}</h2>

        <h3>Written By : {blog.writer}</h3>
        <h3>Twitter : {blog.twitter}</h3>
        <h3>Created At : {blog.createdAt}</h3>

        <Form
          action="destroy"
          method="post"
          onSubmit={(event) => {
            const response = confirm(
              "Please confirm you want to delete this record."
            );
            if (!response) {
              event.preventDefault();
            }
          }}
        >
          <button type="submit">Delete</button>
        </Form>
      </div>
    </div>
  );
}
