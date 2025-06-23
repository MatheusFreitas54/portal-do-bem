import axios from "axios";
import { API_URL } from "./constants";
import { assembleAuthorizationHeaders } from ".";
import { Post, PostInDB } from "../types/Post";

export default {
    async getPostByID(id: string) {
        const result = await axios.get<PostInDB>(`${API_URL}/posts/${id}`, assembleAuthorizationHeaders());
        return result.data;
    },
    async deletePostbyID(id: string): Promise<boolean> {
        const result = await axios.delete(`${API_URL}/posts/${id}`, assembleAuthorizationHeaders());

        return result.status === 200 ? true : false;
    },
    async updatePost(post: Post): Promise<boolean> {
        const result = await axios.put(`${API_URL}/posts/${post._id}`, {...post, content: JSON.stringify(post.content)}, assembleAuthorizationHeaders());

        return result.status === 200 ? true : false;
    },
}