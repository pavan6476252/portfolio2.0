import React from "react";
import { Helmet } from "react-helmet-async";
interface Props {
  title: string;
  description: string;
  creatorName: string;
  type: string;
  keywords: string[];
}
export default function SEO({
  title,
  description,
  creatorName,
  type,
  keywords,
}: Props) {
  return (
    <Helmet>
      <title>{title}</title>

      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(",")} />
      
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      <meta name="twitter:creator" content={creatorName} />
      <meta name="twitter:card" content={type} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />

      <meta name="robots" content="index, follow" />
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
    </Helmet>
  );
}
