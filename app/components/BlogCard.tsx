import { NavLink } from "@remix-run/react";
import React from "react";

export const BlogCard: React.FC = ({ blog }) => {
  return (
    <NavLink to={`blog/${blog.id}`}>
      <div className="blog-container">
        <div className="header-blog">
          <h3>{blog.heading}</h3>
        </div>
        <p>{blog.content}</p>
        <div className="name-twitter">
          <h4 className="name">By: {blog.writer} </h4>
          <span className="twitter-link">@devsh87</span>
        </div>
      </div>
    </NavLink>
  );
};
