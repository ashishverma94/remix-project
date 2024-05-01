import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import invariant from "tiny-invariant";

import { deleteContact } from "../data";

export const action = async ({
  params,
}: ActionFunctionArgs) => {
  console.log(params)
  invariant(params.blogId, "Missing contactId param");
  await deleteContact(params.blogId);
  return redirect("/");
};
