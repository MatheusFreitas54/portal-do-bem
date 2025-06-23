import { CustomElement } from "../components/RichTextEditor/editor.types";

export type Post = {
  _id: string;
  title: string;
  content: CustomElement[];
  user_id: string;
};

export type PostInDB = {
  _id: string;
  title: string;
  content: string;
  user_id: string;
}

export type PostCreate = {
  title: string;
  content: string;
  user_id: string;
}
