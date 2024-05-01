import { NavLink } from "@remix-run/react";
import React from "react";

export const BlogCard: React.FC = ({ blog }) => {
  return (
    <div className="blog-container">
      <div className="header-blog">
        <NavLink to ={`blog/${blog.id}`}>
          <h3>{blog.heading}</h3>
        </NavLink>
      </div>
      <p>{blog.content}</p>
      <div className="name-twitter">
        <h4 className="name">By: {blog.writer} </h4>
        <span className="twitter-link">@devsh87</span>
      </div>
    </div>
  );
};
