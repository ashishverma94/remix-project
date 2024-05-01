import { json, redirect } from "@remix-run/node";
import { createEmptyContact, getContacts } from "./data";
import { useEffect } from "react";

import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  // useNavigation,
  // useSubmit,
} from "@remix-run/react";
// import { getContacts } from "./data";

import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import appStylesHref from "./app.css?url";

// export const loader = async () => {
//   const contacts = await getContacts();
//   return json({ contacts });
// };

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts();
  return json({ contacts, q });
};

export const action = async () => {
  const contact = await createEmptyContact();
  return redirect(`/contacts/${contact.id}/edit`);
};

export default function App() {
  const {  q } = useLoaderData<typeof loader>();
  // const navigation = useNavigation();
  // const submit = useSubmit();

  // const searching =
  //   navigation.location &&
  //   new URLSearchParams(navigation.location.search).has("q");

  useEffect(() => {
    const searchField = document.getElementById("q");
    if (searchField instanceof HTMLInputElement) {
      searchField.value = q || "";
    }
  }, [q]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div>
        <div id="sidebar">
          <button>Home</button>
          
          </div>
        
          <Outlet />
        </div>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];
