"use client";
import { useParams } from "next/navigation";

const EditProductPage = () => {
  const params = useParams();

  return <div>{params.id}</div>;
};

export default EditProductPage;
