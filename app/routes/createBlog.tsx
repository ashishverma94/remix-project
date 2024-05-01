import { Form, redirect } from '@remix-run/react'
import type { ActionFunctionArgs } from "@remix-run/node";
import {  createEmptyContact, updateContact } from '../data';

export const action = async ({  request }: ActionFunctionArgs) => {
    const formData = await request.formData();
    const newData = Object.fromEntries(formData);
    console.log(newData) ;
    await createEmptyContact(newData.id)
    await updateContact(newData.id,newData)
    // await updateContact("xx1", updates);
    return redirect(`/`);
  };

export default function createBlog (){

    

  return (
    <div>
        <Form key="idx" id="contact-form" method="post">
        <p>
        <span>Blog Id</span>
        <input
          aria-label="id"
          name="id"
          type="text"
          placeholder="First"
        />
      </p>
      <p>
        <span>Blog Name</span>
        <input
          aria-label="heading"
          name="heading"
          type="text"
          placeholder="First"
        />
      </p>
      <label>
        <span>Written By</span>
        <input
          name="writer"
          placeholder="@jack"
          type="text"
        />
      </label>
      <label>
        <span>Twitter</span>
        <input
          name="twitter"
          placeholder="@jack"
          type="text"
        />
      </label>
      
      <label>
        <span>Content</span>
        <textarea   name="content" rows={6} />
      </label>
      <p>
        <button type="submit">Save</button>
      </p>
    </Form>
    </div>
  )
}

