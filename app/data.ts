//////////////////////////////////////////////////////////////////////////////
// Nothing in here has anything to do with Remix, it's just a fake database //
//////////////////////////////////////////////////////////////////////////////

// import { matchSorter } from "match-sorter";
// @ts-expect-error - no types, but it's a tiny function

import sortBy from "sort-by";
import invariant from "tiny-invariant";

type BlogMutation = {
  id?: string;
  heading?: string;
  content?: string;
  writer?: string;
  twitter?: string;
};

export type BlogRecord = BlogMutation & {
  id: string;
  createdAt: string;
};

////////////////////////////////////////////////////////////////////////////////
// This is just a fake DB table. In a real app you'd be talking to a real db or
// fetching from an existing API.
const fakeContacts = {
  records: {} as Record<string, BlogRecord>,

  async getAll(): Promise<BlogRecord[]> {
    return Object.keys(fakeContacts.records)
      .map((key) => fakeContacts.records[key])
      .sort(sortBy("-createdAt", "last"));
  },

  async get(id: string): Promise<BlogRecord | null> {
    return fakeContacts.records[id] || null;
  },

  async create(values: BlogMutation): Promise<BlogRecord> {
    const id = values.id || Math.random().toString(36).substring(2, 9);
    const createdAt = new Date().toISOString();
    const newContact = { id, createdAt, ...values };
    fakeContacts.records[id] = newContact;
    return newContact;
  },

  async set(id: string, values: BlogMutation): Promise<BlogRecord> {
    const contact = await fakeContacts.get(id);
    invariant(contact, `No contact found for ${id}`);
    const updatedContact = { ...contact, ...values };
    fakeContacts.records[id] = updatedContact;
    return updatedContact;
  },

  destroy(id: string): null {
    delete fakeContacts.records[id];
    return null;
  },
};

////////////////////////////////////////////////////////////////////////////////
// Handful of helper functions to be called from route loaders and actions
export async function getContacts() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const contacts = await fakeContacts.getAll();
 
  return contacts.sort(sortBy("last", "createdAt"));
}

export async function createEmptyContact() {
  const contact = await fakeContacts.create({});
  return contact;
}

export async function getContact(id: string) {
  return fakeContacts.get(id);
}

export async function updateContact( updates: BlogMutation) {
  console.log(updates)
  // const contact = await fakeContacts.get(id);
  const id = "id"+ Math.random().toString(36).substring(2, 9);


  await fakeContacts.set(id, { ...updates });
  return id;
}

export async function deleteContact(id: string) {
  fakeContacts.destroy(id);
}

[
  {
    id:
      "id1",
    heading: "Day",
    content: "Today is best day",
    writer: "Andre lag",
    twitter:"@AndreLandgraf94"
  },
  {
    id:
      "id2",
    heading: "Remix",
    content: "Remix is a fullstack framework",
    writer: "Ashish Verma",
    twitter:"@AshishVer007"
  },
  {
    id:
      "id3",
    heading: "Javascript",
    content: "Javascript is a best programming language",
    writer: "Java Script",
    twitter:"@JavaScr4"
  },
  {
    id:
      "id4",
    heading: "C++",
    content: "C++ is my first programming language",
    writer: "C plus plus",
    twitter:"@cpp123"
  },
  {
    id:
      "id5",
    heading: "Vscode",
    content: "Vscode is a best ide to write code",
    writer: "rahul garg",
    twitter:"@raggaggag"
  },
  {
    id:
      "id6",
    heading: "Tip",
    content: "always us comment in your code whenever required",
    writer: "Devendra Sharma",
    twitter:"@devSh87"
  },
].forEach((contact) => {
  fakeContacts.create({
    ...contact,
    id: `${contact.id.toLowerCase()}`,
  });
});
